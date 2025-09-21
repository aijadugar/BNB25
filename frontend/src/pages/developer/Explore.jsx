import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader";
import "./Explore.css";

const DeveloperExplore = () => {
  const { onLogout } = useOutletContext();
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPools = async () => {
      try {
        setLoading(true);
        setError("");

        // 1️⃣ Fetch all poolIds
        const resPools = await fetch("http://localhost:5000/api/pools");
        const dataPools = await resPools.json();
        if (!dataPools.success) throw new Error("Failed to fetch pools");

        const poolIds = dataPools.pools.map((p) => p.poolId);

        // 2️⃣ Fetch each pool's dataset details
        const poolDetailsPromises = poolIds.map(async (poolId) => {
          const res = await fetch(`http://localhost:5000/api/pool/purchases/${poolId}`);
          const data = await res.json();
          const poolData = data.pools.find((p) => p.poolId === poolId);

          return {
            poolId,
            datasetName: poolData?.datasetName || "Unknown Dataset",
            category: poolData?.category || "Unknown",
            type: poolData?.type || "Unknown",
            totalSize: poolData?.totalSize || 0,
            price: poolData?.price || 0,
            description: poolData?.description || "No description available",
            contributors: poolData?.contributors || [],
          };
        });

        const poolDetails = await Promise.all(poolDetailsPromises);
        setPools(poolDetails);
      } catch (err) {
        console.error("Error fetching pool data:", err);
        setError("Failed to load pools.");
      } finally {
        setLoading(false);
      }
    };

    fetchPools();
  }, []);

  // Preview button handler
  const handlePreview = async (poolId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/pools/${poolId}`);
      const data = await res.json();
      if (!data.success) throw new Error("Preview fetch failed");

      const randomTimestamp = Date.now() - Math.floor(Math.random() * 1000000000);
      const randomTxHash =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      const randomHeight = Math.floor(Math.random() * 1000);

      alert(
        `Pool ID: ${poolId}\nCIDs: ${data.cids.join(
          ", "
        )}\nTimestamp: ${randomTimestamp}\nHash: ${randomTxHash}\nHeight: ${randomHeight}`
      );
    } catch (err) {
      console.error(err);
      alert("Failed to fetch pool preview.");
    }
  };

  // Pay & Access button handler
  const handlePayAndAccess = async (poolId) => {
    try {
      const res = await fetch("http://localhost:5000/api/buy/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          developerWallet: "cosmos3xyz", // Replace with logged-in dev wallet
          poolId,
          amount: 200, // Fixed or dynamic
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert(`Pool purchased successfully!
Transaction Hash: ${data.tendermintResponse.result.deliver_tx.hash}
Height: ${data.tendermintResponse.result.deliver_tx.height}

Royalty Payouts:
${data.royaltyResponses.map((r) => `${r.wallet}: $${r.payout}`).join("\n")}`);
      } else {
        alert(`Purchase failed: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error purchasing pool.");
    }
  };

  if (loading) return <p>Loading pools...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <DashboardHeader title="Explore Data Pools" onLogout={onLogout} />

      <section className="explore-section">
        {pools.length > 0 ? (
          <div className="explore-table">
            <div className="table-header">
              <div>Pool ID</div>
              <div>Dataset Name</div>
              <div>Category</div>
              <div>Type</div>
              <div>Size</div>
              <div>Price</div>
              <div>Description</div>
              <div>Action</div>
            </div>

            {pools.map((pool) => (
              <div className="table-row" key={pool.poolId}>
                <div>#{pool.poolId}</div>
                <div>{pool.datasetName}</div>
                <div>{pool.category}</div>
                <div>{pool.type}</div>
                <div>{pool.totalSize} MB</div>
                <div className="price">${pool.price}</div>
                <div>{pool.description}</div>
                <div>
                  <button
                    className="preview-btn"
                    onClick={() => handlePreview(pool.poolId)}
                  >
                    Preview
                  </button>
                  <button
                    className="pay-btn"
                    onClick={() => handlePayAndAccess(pool.poolId)}
                  >
                    Pay & Access
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data">
            <p>No datasets found.</p>
          </div>
        )}
      </section>
    </>
  );
};

export default DeveloperExplore;
