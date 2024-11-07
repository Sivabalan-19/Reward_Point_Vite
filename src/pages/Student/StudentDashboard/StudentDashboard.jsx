import React, { useState} from "react";
import '../../../Styles/Global.css'
import axios from "axios";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdLightMode, MdOutlineAccountTree } from "react-icons/md";
import { useMemo, useEffect } from "react";
import Table from "../../../components/Table/Table";
import '../../../Styles/Responsive.css'
import { FaBook } from "react-icons/fa";
import { VscThreeBars } from "react-icons/vsc";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Cell,
} from "recharts";
import { IoMenu, IoMoon, IoReorderThreeOutline } from "react-icons/io5";
import {
  MdOutlineAddAlert,
  MdBarChart,
  MdSummarize,
  MdNotificationsNone,
  MdOutlineLightMode,
  MdDarkMode,
} from "react-icons/md";
import { Divider } from "@mui/material";
import Notificationpopup from "../../../components/Notificaition/Notificationpopup";
import ResponsiveSide from "../../../components/Sidebar/ResponsiveSidebar";
import MembersTable from "../MyEvent/AddMember/MembersTable";

const StudentDashboard = ({ darkMode, toggleDarkMode }) => {
  const [average, setaverage] = useState([]);
  const [RP, setRP] = useState([]);
  const [position, setposition] = useState([]);
  const [count, setcount] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [balance, setbalance] = useState([]);
  const [redeemed, setredeemed] = useState([]);
  const [penalty, setpenalty] = useState([]);
  const [total, settotal] = useState([]);
  const [sidebar, setsidebar] = useState(false);

  const data = [
    { name: "Average Points", value: average, fill: "#FF975C" },
    { name: "Overall Points", value: RP, fill: "#4318FF" },
  ];

  const CustomLabel = ({ x = 0, y = 0, width = 0, value = "" }) => (
    <text
      x={x + width / 2}
      y={y + 35}
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={25}
      fontWeight="bold"
    >
      {value}
    </text>
  );

  const CustomBarChart = ({ width = 350, height = 300 }) => (
    <BarChart width={width} height={height} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="value">
        <LabelList dataKey="value" content={<CustomLabel />} />
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
      </Bar>
    </BarChart>
  );

  const PenaltyCard = ({ bgColor, points, name }) => {
    const cardStyle = {
      backgroundColor: bgColor,
      borderRadius: "7px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontFamily: "Arial, sans-serif",
      fontWeight: "bold",
      overflow: "hidden",
      position: "relative",
      textAlign: "center",
    };

    const circleStyle = {
      position: "absolute",
      top: "-40px",
      left: "-40px",
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      border: "16px solid rgba(139, 0, 0, 0.2)",
      boxSizing: "border-box",
    };
    return (
      <div style={cardStyle} className="cardff">
        <div style={circleStyle}></div>
        <div style={{ fontSize: "1.1rem", fontWeight: "lighter" }}>{name}</div>
        <div
          style={{ fontSize: "1.2rem", fontWeight: "500", paddingTop: "6px" }}
        >
          {points}
        </div>
      </div>
    );
  };
  const columns = useMemo(
    () => [
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Details",
        accessor: "details",
      },
    ],
    []
  );
  const columns2 = useMemo(
    () => [
      {
        // first group - TV Show
        Header: "S.no",
        accessor: "sno",

        // First group columns
      },
      {
        // Second group - Details
        Header: "Subject",
        accessor: "subject",
      },
      {
        // Second group - Details
        Header: "IP-1",
        accessor: "ip1",
      },
      {
        // Second group - Details
        Header: "IP-2",
        accessor: "ip2",
      },
      {
        // Second group - Details
        Header: "total",
        accessor: "total",
      },
    ],
    []
  );

  const [tabledata, settabledata] = useState([
    { category: "Technical events", count: 0, points: 0.0 },
    { category: "Skills", count: null, points: 0.0 },
    { category: "Assignments", count: 0, points: 0.0 },
    { category: "Interview", count: 0, points: 0.0 },
    { category: "Technical Society Activities", count: 0, points: 0.0 },
    { category: "Product Development", count: null, points: 0.0 },
    { category: "TAC", count: null, points: 0.0 },
    { category: "Special Lab Initiatives", count: 0, points: 0.0 },
    { category: "Extra-Curricular Activities", count: 0, points: 0.0 },
    { category: "Student Initiatives", count: null, points: 0.0 },
    { category: "External Events", count: null, points: 0.0 },
    { category: "Cumulative Points", count: null, points: 0.0 },
    { category: "REWARD POINTS FROM HONOR POINTS", count: null, points: 0.0 },
  ]);

  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data1, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  useEffect(() => {
    (async () => {
      axios.defaults.withCredentials = true;
      const result = await axios.get(
        import.meta.env.VITE_API_URL + "student/bar",
        {
          headers: {
            withCredentials: true,
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );

      setaverage(result.data.message[0].AverageRP);
      setRP(result.data.message[0].TotalRP);
      setposition(result.data.message[0].Position);
      setcount(result.data.message[0].count);
      setbalance(result.data.message[0].TotalRP);
      setredeemed(result.data.message[0].redeemed);
      setpenalty(result.data.message[0].penalty);
      settotal(result.data.message[0].TotalRP);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      axios.defaults.withCredentials = true;
      const result = await axios.get(
        import.meta.env.VITE_API_URL + "student/rewardtable",
        {
          headers: {
            withCredentials: true,

            Authorization: localStorage.getItem("authToken"),
          },
        }
      );

      settabledata(result.data.message);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      axios.defaults.withCredentials = true;
      const result = await axios.get(
        import.meta.env.VITE_API_URL + "student/rewarddistributed",
        {
          headers: {
            withCredentials: true,
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );
      setData2(result.data.message);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      axios.defaults.withCredentials = true;
      const result = await axios.get(
        import.meta.env.VITE_API_URL + "student/rewardinternal",
        {
          headers: {
            withCredentials: true,

            Authorization: localStorage.getItem("authToken"),
          },
        }
      );
      setData3(result.data.message);
    })();
  }, []);

  const Sidebarclicked = () => {
    if (sidebar) {
      setsidebar(false);
    } else {
      setsidebar(true);
    }
  };


  return (
    <div className={`con ${darkMode ? "dark-mode" : ""}`}>
      <div className="header1">
        <div className="Dash-rep-rep">
          <div className="burger" onClick={() => Sidebarclicked()}>
            <VscThreeBars  />
          </div>
          <div>Dashboard</div>
        </div>
        <div className="theme">
          <div
            className="noti"
            onClick={() => {
              setShowNotifications(!showNotifications);
            }}
          >
            <MdNotificationsNone />
          </div>
          <div className="light" onClick={toggleDarkMode}>
            {darkMode ? <IoMoon /> : <MdLightMode />}
          </div>
        </div>
      </div>

      <div
        className="allbody"
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        {sidebar ? <ResponsiveSide setsidebar={setsidebar} /> : ""}
        <div className="dashmain">
          <div className="gramain">
            <div className="dashboardgra">
              <div className="dashboardgraph1">
                <div className="graph1details">
                  <div>
                    <CustomBarChart />
                  </div>
                  <div className="secondyearcolor">Reward Points Graph</div>
                </div>
                <div className="dashboardpointdet">
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      justifyContent: "center",
                    }}
                  >
                    <div className="pointdetailicon">
                      <MdOutlineAddAlert />
                    </div>
                    <div className="pointdetail">Points Details</div>
                  </div>
                  <Divider style={{ width: "80%", margin: "auto" }} />
                  <div className="averagerewardpoints">
                    <div className="pointdetailcolor">
                      Average Reward points
                    </div>
                    <div className="pointdetailcolor-1">:</div>
                    <div className="pointdetailcolor-2">{average}</div>
                  </div>
                  <div className="totalrewardpoint">
                    <div className="pointdetailcolor">
                      Total Rewards points Earned
                    </div>
                    <div className="pointdetailcolor-1">:</div>
                    <div className="pointdetailcolor-2">{RP}</div>
                  </div>

                  <button className="position">
                    Position # {position}/{count}
                  </button>
                </div>
              </div>
            </div>

            <div className="rpcardcontainer">
                <div className="pointsum">
                  <div
                    style={{
                      fontSize: "20px",
                      color: "#4318FF",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <MdSummarize />
                  </div>
                  <div className="rpcardcontainerpointtit">Points Summary</div>
                </div>
                <div className="rpline">
                  <div className="rr123">
                    <PenaltyCard
                      bgColor="#4318FF"
                      points={total}
                      name="Total Points"
                    />
                    <PenaltyCard
                      bgColor="#01B574"
                      points={balance - redeemed - penalty}
                      name="Balance Points"
                    />
                  </div>
                  <div className="rr123">
                    <PenaltyCard
                      bgColor="#FF975C"
                      points={redeemed}
                      name="Redeemed Points"
                    />
                    <PenaltyCard
                      bgColor="#F65656"
                      points={penalty}
                      name="Penalties Points"
                    />
                  </div>
                </div>
                <div className="eligiblerp">
                  <div className="eligiblepreviousem">
                    <div className="elegiblecarryrptext">
                      Eligible carry in points from <br />
                      previous semester (2023 - ODD)
                    </div>
                    <div className="elegiblecarryrppoint">RP 1000</div>
                  </div>
                  <div className="eligiblenextsem">
                    <div className="elegiblecarryrptext">
                      Eligible carry forward points to
                      
                      next semester (2023 - EVEN)
                    </div>
                    <div className="elegiblecarryrppoint">RP 1000</div>
                  </div>
                </div>
            </div>
          </div>

          <div className="detailedpointbox">
            <div className="detailedpointhead">
              <div style={{ fontSize: "25px" }}>
                <RiAccountCircleLine className="detaileailedpointicon" />
              </div>
              <div className="detailedpointtitle">Detailed Points Split up</div>
            </div>
            <div
              style={{
                fontSize: "20px",
                textAlign: "center",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              2023-2024 Even Semester
            </div>

            <div className="pointdetbutton">
              <div style={{ fontSize: "24px" }}>
                <MdOutlineAccountTree className="detaileailedpointicon" />
              </div>
              <div className="pointdetailbutton">Points Details</div>
            </div>
            <div className="r">
              <div className="points-table">
                <table>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Count Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabledata.map((row, index) => (
                      <tr key={index}>
                        <td>
                          {row.category}
                          {row.count !== null ? `(${row.count})` : ""}
                        </td>
                        <td>{row.points.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="pmain">
          <div className="table1">
            <div className="rpinternaldistributon">
              <span style={{display:'flex',alignItems:'center'  }}>
              <IoMenu style={{ color: "blue", fontSize:'20px' }}/>
              </span>
              &ensp; Reward Points Distribution
            </div>
            <MembersTable className="table1backend" columns={columns2} data={data2} />
          </div>
          <div className="table2">
            <div className="rpinternaldistributon">
              <span style={{display:'flex',alignItems:'center'  }}>
                <FaBook style={{ color: "blue" }}/>
              </span>
              &ensp; Internal Mark Distribution
            </div>
            <MembersTable columns={columns2} data={data3} />
          </div>
        </div>
        <div style={{ height: "20px" }}></div>
      </div>

      {showNotifications && <Notificationpopup></Notificationpopup>}
    </div>
  );
};

export default StudentDashboard;
