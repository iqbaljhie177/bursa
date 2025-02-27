import { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/SIdebar";
import { AuthContext } from "../components/AuthProvider";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

const KYCRequest = () => {
  const [kycData, setKycData] = useState<any>([]);

  const getData = async () => {
    try {
      await getDocs(collection(db, "kycData")).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setKycData([...kycData, { ...doc.data(), id: doc.id }]);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Sidebar>
      <div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Kyc Request</h5>
            <div
              className="btn-group my-4"
              role="group"
              aria-label="Basic example"
            >
              <button type="button" className="btn btn-outline-primary">
                Process
              </button>
              <button type="button" className="btn btn-outline-success">
                Success
              </button>
              <button type="button" className="btn btn-outline-danger">
                Failed
              </button>
            </div>
            <div style={{ overflowX: "scroll" }}>
              <History data={kycData} />
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default KYCRequest;

const History = ({ data }: { data: any[] }) => {
  return (
    <table className="table table-striped" style={{ minWidth: "1000px" }}>
      <thead>
        <tr>
          <th>No</th>
          <th>User</th>
          <th>ID Card</th>
          <th>Video</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((notification, index) => (
          <tr key={index} style={{ fontSize: "14px" }}>
            <td>{index + 1}</td>
            <td>{notification?.username}</td>
            <td>
              <a
                href={notification?.idCardUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Detail Foto
              </a>
            </td>
            <td>
              <a
                href={notification?.videoVerifyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Detail Video
              </a>
            </td>
            <td>{notification?.status}</td>
            <td>{notification?.createdAt?.toDate()?.toDateString()}</td>
            <td>{notification?.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
