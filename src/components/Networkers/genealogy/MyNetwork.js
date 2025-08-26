import React, { useEffect, useState, useMemo, useRef, useLayoutEffect } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Person4Icon from '@mui/icons-material/Person4';
import { copyToClipboard } from "../../../utils/copyTextToClipBoard";
import { useSelector } from "react-redux";
import query from "../../../helpers/query.ts";

function MyNetwork() {
  const userInfo = useSelector((state) => state);
  const [alertText, setAlert] = useState("");
  const [loading, setLoading] = useState(false);
  const [allDownlines, setAllDownlines] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hoveredUser, setHoveredUser] = useState(null);
  const nodeRefs = useRef({}); // store refs for each user node
  const [lines, setLines] = useState([]);


  /** Fetch hierarchy */
  const getMyNetwork = async () => {
    setLoading(true);
    const response = await query({
      method: "GET",
      url: `/profile/hierarchy-all-downline`,
      token: userInfo?.user?.user?.token,
    });
    if (response.success) {
      setAllDownlines(response?.data?.data?.allDownline || []);
    } else {
      setAlert(response?.data?.message || "Failed to load network.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const newLines = [];
    if (userInfo?.user?.user?.token) getMyNetwork();
  }, [userInfo?.user?.user?.token]);

  /** Copy refId */
  const handleCopy = () => {
    if (!userInfo?.user?.user?.my_ref_id) {
      setAlert("No referral ID found!");
      setTimeout(() => setAlert(null), 5000);
      return;
    }
    copyToClipboard(`${userInfo?.user?.user?.my_ref_id}`, (message) => {
      setAlert(message);
      setTimeout(() => setAlert(null), 5000);
    });
  };

  /** Count helpers */
  const countTotalDownlines = (persons) => {
    let count = 0;
    const recurse = (list) => {
      if (!list || list.length === 0) return;
      list.forEach((u) => {
        count++;
        if (u.all_downline?.length) recurse(u.all_downline);
      });
    };
    recurse(persons);
    return count;
  };
  const countDirectDownlines = (users) => users?.length || 0;

  const totalDownlines = countTotalDownlines(allDownlines);
  const directDownlines = countDirectDownlines(allDownlines);

  /** ───────────── Grid renderer with connecting lines ───────────── */
  const UserHierarchyGrid = ({ allDownlines }) => {
    const branchingFactor = 2;
    const nodeRefs = useRef(new Map());
    const [lines, setLines] = useState([]);

    const normalizePositionIndex = (pos) => {
      if (pos === undefined || pos === null) return 0;
      const s = String(pos).trim().toLowerCase();
      if (s === "left" || s === "l") return 0;
      if (s === "right" || s === "r") return 1;
      const n = parseInt(s, 10);
      return Number.isFinite(n) ? Math.max(0, (n - 1) % branchingFactor) : 0;
    };

    /** Build levels */
    const buildLevels = useMemo(() => {
      const root = {
        id: userInfo?.user?.user?.id ?? "me",
        username: `${userInfo?.user?.user?.fname ?? ""} ${userInfo?.user?.user?.lname ?? ""}`.trim(),
        my_ref_id: userInfo?.user?.user?.my_ref_id ?? userInfo?.user?.user?.refId,
        position: 1,
        all_downline: allDownlines || [],
      };
      const levels = [];
      const traverse = (user, level, slot) => {
        if (!levels[level]) levels[level] = new Map();
        levels[level].set(slot, user);
        const children = Array.isArray(user.all_downline) ? [...user.all_downline] : [];
        children.sort((a, b) => normalizePositionIndex(a.position) - normalizePositionIndex(b.position));
        children.forEach((child) => {
          const posIdx = normalizePositionIndex(child.position);
          const childSlot = slot * branchingFactor + posIdx;
          traverse(child, level + 1, childSlot);
        });
      };
      traverse(root, 0, 0);
      return levels;
    }, [allDownlines, userInfo]);

    /** Draw connector lines */
    useLayoutEffect(() => {
        const newLines = [];
        buildLevels.forEach((slotMap, levelIdx) => {
          slotMap.forEach((user, slot) => {
            const parentKey = `${levelIdx}-${slot}`;
            const parentRef = nodeRefs.current.get(parentKey);
            if (!parentRef) return;
      
            const parentRect = parentRef.getBoundingClientRect();
            const parentX = parentRect.left + parentRect.width / 2 + window.scrollX;
            const parentY = parentRect.top + parentRect.height + window.scrollY;
      
            if (user.all_downline) {
              user.all_downline.forEach((child) => {
                const posIdx = normalizePositionIndex(child.position);
                const childSlot = slot * branchingFactor + posIdx;
                const childKey = `${levelIdx + 1}-${childSlot}`;
                const childRef = nodeRefs.current.get(childKey);
                if (!childRef) return;
      
                const childRect = childRef.getBoundingClientRect();
                const childX = childRect.left + childRect.width / 2 + window.scrollX;
                const childY = childRect.top + window.scrollY;
      
                newLines.push({ x1: parentX, y1: parentY, x2: childX, y2: childY });
              });
            }
          });
        });
        setLines(newLines);
      }, [buildLevels]);

    return (
      <div style={{ position: "relative" }}>
        <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {lines.map((line, index) => (
            <line
                key={index}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="black"
                strokeWidth="2"
            />
            ))}

      </svg>


        {buildLevels.map((slotMap, levelIdx) => {
          const cols = Math.pow(2, levelIdx);
          const row = Array.from({ length: cols }, (_, i) => slotMap.get(i) || null);
          return (
            <div
              key={levelIdx}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, minmax(160px, 1fr))`,
                gap: 12,
                justifyContent: "center",
                justifyItems: "center",
                alignItems: "start",
                margin: "250px 0",
              }}
            >
              {row.map((node, colIdx) => {
                const nodeKey = `${levelIdx}-${colIdx}`;
                return (
                  <div key={colIdx} ref={(el) => nodeRefs.current.set(nodeKey, el)} >
                    {node ? (
                      <a
                        className="node"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setHoveredUser(node);
                          setIsPopupOpen(true);
                        }}
                        style={{
                          display: "inline-flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: "10px",
                          border: "5px solid #d0d7de",
                          borderRadius: '50%',
                          background: "#fff",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                          display: 'inline-flex',
                            height: 50,
                            width: 50,
                            position: 'absolute',
                            zIndex: 9999,
                        }}
                      >
                        <Person4Icon style={{ marginBottom: 4 }} />
                        <div className="sdgwehfhe">
                        <div style={{ fontWeight: 600, fontSize: 14, textAlign: "center", textTransform: 'capitalize' }}>
                          {node.username }
                        </div>
                        {node.my_ref_id && <div className="nodetext" style={{ fontSize: 12, opacity: 0.8 }}>{node.my_ref_id}</div>
                        }
                        </div>
                      </a>
                    ) : (
                      <div style={{ width: 0, height: 0 }} />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="flex w-100 vbczsds">
        <p className="flex alc" onClick={handleCopy}>
          My Referral ID{" "}
          <span className="text-muted py-5"> {userInfo?.user?.user?.refId} </span>
          <ContentCopyIcon title="Click to copy" style={{ cursor: "pointer", marginLeft: 8 }} />
        </p>
        <p>
          Account Type <span className="text-muted py-5"> {userInfo?.user?.user?.user_type} </span>
        </p>
        <p>
          Total Downlines <span className="text-muted py-5"> {totalDownlines} </span>
        </p>
        <p>
          Direct Referral <span className="text-muted py-5"> {directDownlines} </span>
        </p>
        <p>
          Indirect Referral <span className="text-muted py-5"> {Math.max(0, totalDownlines - directDownlines)} </span>
        </p>
      </div>

      <div className="tree" style={{ marginTop: 24 }}>
        <p className="text-center" style={{ marginTop: 24, fontWeight: 700 }}>
          <Person4Icon /> {userInfo.user?.user?.fname} {userInfo.user?.user?.lname}
        </p>
        {loading ? "Loading..." : <UserHierarchyGrid allDownlines={allDownlines || []} />}
      </div>
    </>
  );
}

export default MyNetwork;
