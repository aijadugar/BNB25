# kvstore.py
from abci.application import BaseApplication
from abci.server import ABCIServer
import json

class KVStore(BaseApplication):
    def __init__(self):
        super().__init__()
        self.state = {}  # Store pools: { poolId: {cid, wallet, ...} }

    def info(self, req):
        # Return basic info about the ABCI app
        return {
            "data": "Python ABCI KVStore",
            "last_block_height": len(self.state),
            "last_block_app_hash": b""
        }

    def set_option(self, req):
        return {}

    def deliver_tx(self, req):
        """
        Expect tx format: "poolId=<poolId>&cid=<cid>&wallet=<wallet>"
        Stores data in self.state using poolId as key
        """
        tx_data = req.decode()  # decode bytes to string
        kv = {}
        for pair in tx_data.split("&"):
            if "=" in pair:
                k, v = pair.split("=")
                kv[k] = v

        pool_id = kv.get("poolId")
        if pool_id:
            self.state[pool_id] = kv  # store the whole dictionary as value

        return {"code": 0}

    def check_tx(self, req):
        # Always accept transactions in this simple demo
        return {"code": 0}

    def query(self, req):
        """
        Query by poolId
        Returns the stored dictionary as JSON
        """
        pool_id = req.data.decode()
        value = self.state.get(pool_id, {})
        return {"code": 0, "value": json.dumps(value).encode()}


if __name__ == "__main__":
    app = KVStore()
    server = ABCIServer(app)
    print("Starting ABCI server on TCP port 26658...")
    server.run()  # starts listening for Tendermint
