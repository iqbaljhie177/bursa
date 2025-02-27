import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/SIdebar";
import { Modal } from "react-responsive-modal";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import Loading, { LargeLoad } from "../components/Loading";
import { toast } from "react-toastify";

interface PaymentMethodType {
  id: string;
  nameOfBank: string;
  logo: string;
  accountName: string;
  accountNumber: string;
  limit: string;
}

const PaymentMethod = () => {
  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [loadMounted, setLoadMounted] = useState(false);
  const [paymentMethods, setPaymentMethod] = useState<PaymentMethodType[]>([]);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleCreatePaymentMethod = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const {
      nameOfBank,
      logo,
      accountName,
      accountNumber,
      limit,
      averageTime,
      comission,
    } = e.currentTarget;

    if (!limit?.value?.includes("$")) {
      alert("Limit Must include $");
      return;
    }

    try {
      setLoad(true);
      await addDoc(collection(db, "paymentMethods"), {
        nameOfBank: nameOfBank?.value,
        logo: logo?.value,
        accountName: accountName?.value,
        accountNumber: accountNumber?.value,
        limit: limit?.value,
        comission: comission?.value,
        averageTime: averageTime?.value,
      }).then((data) => {
        if (data?.id) {
          toast("Payment Method Added", { type: "success" });
          getPaymentMethods().then(() => {
            setOpen(false);
          });
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  const getPaymentMethods = async () => {
    try {
      setLoadMounted(true);
      const querySnapshot = await getDocs(collection(db, "paymentMethods"));
      const dataList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PaymentMethodType[];
      setPaymentMethod(dataList);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadMounted(false);
    }
  };

  const handleDeletePaymentMethod = async (id: string) => {
    const confDel = confirm("Are You Sure?");

    if (confDel) {
      try {
        setLoad(true);
        await deleteDoc(doc(db, "paymentMethods", id)).then(async () => {
          await getPaymentMethods().then(() => {
            toast("Payment Method Deleted", { type: "success" });
            setLoad(false);
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getPaymentMethods();
  }, []);

  return (
    <Sidebar>
      <button onClick={onOpenModal} className="btn btn-primary m-3">
        <i className="fa-solid fa-plus"></i>
        Add Payment Method
      </button>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        styles={{
          modal: { width: window.innerWidth > 1024 ? "500px" : "90%" },
        }}
      >
        <form
          onSubmit={handleCreatePaymentMethod}
          className="d-flex flex-column gap-3"
        >
          <label>Bank Name:</label>
          <input
            className="form-control"
            placeholder="Example: MAYBANK"
            name="nameOfBank"
            required
          />
          <label>Logo:</label>
          <select className="form-select" required name="logo">
            <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/maybank.png">
              MAYBANK
            </option>
            <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/download%20(4).png">
              HSBC
            </option>
            <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/download%20(3).png">
              OCBC
            </option>
            <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/cimb.png">
              AM BANK
            </option>
            <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/cimb.png">
              CIMB BANK
            </option>
            <option value="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOL_Y1kLrBRKQzfHcS4fcJJonIb_UA6AuoGQ&s">
              BNS BANK
            </option>
            <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/bangkok.jpg">
              BANGKOK BANK
            </option>
            <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/abmb_logo.png">
              ALLIANCE BANK
            </option>
            <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/Public_Bank_Berhad_logo1.png">
              PUBLIC BANK
            </option>
            <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/Bank-Islam-LOGO_small.png">
              BANK ISLAM
            </option>
            <option value="https://psesvtyegdxjucbrfroz.supabase.co/storage/v1/object/public/p2/AFFIN_BANK_Logo_Full_Colour.png">
              AFFIN BANK
            </option>
          </select>
          <label>Account Name:</label>
          <input
            className="form-control"
            placeholder="Example: John Doe"
            name="accountName"
            required
          />
          <label>Account Number:</label>
          <input
            className="form-control"
            placeholder="Example: 7653 2736 1253"
            name="accountNumber"
            required
          />
          <label>Limit:</label>
          <input
            className="form-control"
            placeholder="Example: $0 - $10"
            required
            name="limit"
          />
          <label>Average Time:</label>
          <input
            className="form-control"
            placeholder="Example: Instant or 24hours"
            required
            name="averageTime"
          />
          <label>Comission:</label>
          <input
            className="form-control"
            placeholder="Example: 0% or 2%"
            required
            name="comission"
          />
          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={load}
            style={{ opacity: load ? 0.5 : 1 }}
          >
            {load ? <Loading /> : "Submit"}
          </button>
        </form>
      </Modal>
      {loadMounted ? (
        <div
          className="d-flex justify-content-center m-3"
          style={{ background: " #eee" }}
        >
          <LargeLoad />
        </div>
      ) : (
        <div className="mx-3">
          <div className="row">
            {paymentMethods.map((paymentMethod) => (
              <div className="col-md-4 my-3">
                <div className="card shadow">
                  <img
                    src={paymentMethod?.logo}
                    className="card-img-top p-3 w-100"
                    alt="..."
                    style={{ height: "100px", objectFit: "contain" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{paymentMethod?.nameOfBank}</h5>
                    <div className="card-text">
                      <span className="fw-bold">Account Name: </span>
                      <span>{paymentMethod?.accountName}</span>
                    </div>
                    <div className="card-text">
                      <span className="fw-bold">Account Number: </span>
                      <span>{paymentMethod?.accountNumber}</span>
                    </div>
                    <div className="card-text">
                      <span className="fw-bold">Limit: </span>
                      <span>{paymentMethod?.limit}</span>
                    </div>
                    <button
                      onClick={() =>
                        handleDeletePaymentMethod(paymentMethod?.id)
                      }
                      disabled={load && !open}
                      className="btn btn-danger mt-3"
                    >
                      {"Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Sidebar>
  );
};

export default PaymentMethod;
