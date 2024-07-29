import React, { useState, useEffect } from "react";
import { Octokit } from "@octokit/rest";

const GITHUB_API_TOKEN = process.env.NEXT_PUBLIC_GITHUB_API_TOKEN;

// Initialize Octokit
const octokit = new Octokit({
  auth: GITHUB_API_TOKEN,
});

const octokit2 = new Octokit({
  // auth: GITHUB_API_TOKEN,
});

function ReleaseSelector() {
  const [releases, setReleases] = useState([]);
  const [selectedRelease, setSelectedRelease] = useState("");
  const [binFile, setBinFile] = useState(null);

  // const owner = "bodysynths";
  // const repo = "firmware";
  const owner = "symbiosdotwiki";
  const repo = "metal-fetishist-demo-releases";

  useEffect(() => {
    fetchReleases();
  }, []);

  const fetchReleases = async () => {
    try {
      const { data } = await octokit.repos.listReleases({
        owner: owner,
        repo: repo,
      });
      setReleases(data);
    } catch (error) {
      console.error("Failed to fetch releases:", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedRelease(event.target.value);
    setBinFile(null); // Clear previous bin file when a new release is selected
  };

  const fetchBinFile = async () => {
    if (!selectedRelease) return;

    const release = releases.find((r) => r.tag_name === selectedRelease);
    if (!release) return;

    const binAsset = release.assets.find((asset) =>
      asset.name.endsWith(".bin")
    );
    if (!binAsset) {
      console.error("No .bin file found in this release");
      return;
    }

    try {
      const token = `token ${GITHUB_API_TOKEN}`;
      // const token = "token 28210b69e1cb1e02db721cd2ce1e9825a5f68add";
      console.log(token, binAsset.url);
      // const response = await octokit.request(
      //   "GET /repos/{owner}/{repo}/releases/assets/{asset_id}",
      //   {
      //     owner: owner,
      //     repo: repo,
      //     asset_id: binAsset.id,
      //     headers: {
      //       Accept: "application/octet-stream",
      //     },
      //   }
      // );
      // const response = await octokit.request(
      //   "GET /repos/{owner}/{repo}/releases/assets/{asset_id}",
      //   {
      //     owner: owner,
      //     repo: repo,
      //     asset_id: binAsset.id,
      //     headers: {
      //       // "X-GitHub-Api-Version": "2022-11-28",
      //       Accept: "application/octet-stream",
      //     },
      //   }
      // );
      // const response = await octokit.request("GET {url}", {
      //   url: binAsset.url,
      //   headers: {
      //     Accept: "application/octet-stream",
      //     // "X-GitHub-Api-Version": "2022-11-28",
      //   },
      // });

      // const response = await octokit.request(
      //   "GET /repos/{owner}/{repo}/releases/assets/{asset_id}",
      //   {
      //     owner: "OWNER",
      //     repo: "REPO",
      //     asset_id: "ASSET_ID",
      //     headers: {
      //       "X-GitHub-Api-Version": "2022-11-28",
      //     },
      //   }
      // );

      const response = await fetch(binAsset.url, {
        headers: {
          Authorization: token,
          Accept: "application/octet-stream",
          // "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      const { data } = response;

      console.log(response);

      // Convert the response to an ArrayBuffer
      const arrayBuffer = await response.arrayBuffer();
      setBinFile(arrayBuffer);
      console.log(
        `Bin file loaded into memory. Size: ${arrayBuffer.byteLength} bytes`
      );
    } catch (error) {
      console.error("Failed to fetch .bin file:", error);
    }
  };

  return (
    <div>
      <select value={selectedRelease} onChange={handleSelectChange}>
        <option value="">Select a release</option>
        {releases.map((release) => (
          <option key={release.id} value={release.tag_name}>
            {release.name || release.tag_name}
          </option>
        ))}
      </select>
      {selectedRelease && (
        <div>
          <p>Selected release: {selectedRelease}</p>
          <button onClick={fetchBinFile}>Load .bin file into memory</button>
        </div>
      )}
      {binFile && (
        <p>Bin file loaded into memory. Size: {binFile.byteLength} bytes</p>
      )}
    </div>
  );
}

export default ReleaseSelector;
