from abci.application import BaseApplication
from abci.server import ABCIServer
import json
import time
import hashlib

class KVStore(BaseApplication):
    def __init__(self):
        super().__init__()
        self.state = {
            "pools": {},
            "purchases": {},
            "balances": {}
        }
        self.current_height = 0  # simulate block height
        self.last_hash = ""      # simulate last block hash

    def _generate_block_hash(self, tx=""):
        """
        Generate a fake block hash from last hash + tx + timestamp
        """
        data = f"{self.last_hash}{tx}{time.time()}".encode()
        h = hashlib.sha256(data).hexdigest()
        self.last_hash = h
        self.current_height += 1
        return h

    def info(self, req):
        return {
            "data": "Python ABCI app",
            "last_block_height": self.current_height,
            "last_block_app_hash": self.last_hash.encode()
        }

    def set_option(self, req):
        return {}
    
    def _parse_tx(self, tx):
        kv = {}
        for pair in tx.split("&"):
            if "=" in pair:
                k, v = pair.split("=", 1)
                kv[k] = v
        return kv

    def deliver_tx(self, req):
        tx = req.decode()
        kv = self._parse_tx(tx)
        print(f"\n[DELIVER_TX] Received tx: {tx}")
        print(f"[DELIVER_TX] Parsed kv: {kv}")

        # 1) pool registration tx
        if "poolId" in kv and "cid" in kv and "wallet" in kv and "buy" not in kv and "royalty" not in kv:
            pool_id = kv["poolId"]
            self.state["pools"][pool_id] = {
                "cid": kv.get("cid"),
                "uploader": kv.get("wallet"),
                "timestamp": int(time.time())
            }
            block_hash = self._generate_block_hash(tx)
            print(f"[POOL REGISTRATION] poolId {pool_id} registered with CID {kv.get('cid')}, block {self.current_height}")
            return {"code": 0}

        # 2) buy tx
        if "buy" in kv and "wallet" in kv:
            purchase_key = f"{kv['buy']}_{kv['wallet']}_{int(time.time())}"
            self.state["purchases"][purchase_key] = kv
            block_hash = self._generate_block_hash(tx)
            print(f"[BUY TX] Developer {kv['wallet']} bought pool {kv['buy']} for amount {kv.get('amount')}, block {self.current_height}")
            return {"code": 0}

        # 3) royalty tx
        if "royalty" in kv and "wallet" in kv and "amount" in kv:
            wallet = kv["wallet"]
            amount = float(kv["amount"])
            curr = float(self.state["balances"].get(wallet, 0))
            self.state["balances"][wallet] = curr + amount
            hist_key = f"royalty_{kv['royalty']}_{wallet}_{int(time.time())}"
            self.state[hist_key] = {"pool": kv['royalty'], "wallet": wallet, "amount": amount, "ts": int(time.time())}
            block_hash = self._generate_block_hash(tx)
            print(f"[ROYALTY TX] Paid {amount} to {wallet} for pool {kv['royalty']}, block {self.current_height}")
            return {"code": 0}

        print(f"[DELIVER_TX] Unknown transaction type")
        return {"code": 1, "log": "Unknown transaction type"}

    def check_tx(self, req):
        tx_data = req.decode() if isinstance(req, bytes) else str(req)
        print(f"[CHECK_TX] {tx_data}")
        return {"code": 0}

    def query(self, req):
        q = req.data.decode()
        print(f"[QUERY] Received query: {q}")

        # balance query
        if q.startswith("balance:"):
            wallet = q.split(":",1)[1]
            bal = self.state["balances"].get(wallet, 0)
            print(f"[QUERY] Balance of {wallet}: {bal}")
            return {"code": 0, "value": json.dumps({"wallet": wallet, "balance": bal, "timestamp": int(time.time())}).encode()}

        # pool query
        if q in self.state["pools"]:
            pool_data = self.state["pools"][q]
            print(f"[QUERY] Pool metadata for {q}: {pool_data}")
            return {"code": 0, "value": json.dumps({
                **pool_data,
                "blockHash": self.last_hash,
                "height": self.current_height,
                "timestamp": int(time.time())
            }).encode()}

        # fallback: poolId not found → return current block info
        block_hash = self.last_hash or self._generate_block_hash()
        self.current_height += 1
        fallback_response = {
            "blockHash": block_hash,
            "height": self.current_height,
            "timestamp": int(time.time())
        }
        print(f"[QUERY] Fallback response: {fallback_response}")
        return {"code": 0, "value": json.dumps(fallback_response).encode()}


if __name__ == "__main__":
    app = KVStore()
    server = ABCIServer(app)
    print("Starting ABCI server on TCP port 26658...")
    server.run()
