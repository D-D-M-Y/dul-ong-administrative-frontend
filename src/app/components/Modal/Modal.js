import React, { useState } from "react";
import "./Modal.css";
import { RiCloseCircleFill } from "react-icons/ri";
import Link from 'next/link';



export default function Modal({ onToggle }) {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
        onToggle && onToggle(!modal); // Call the callback if provided
    };


    return (
        <>
            <button onClick={toggleModal} className="w-full bg-indigo-100 rounded-[40px] text-neutral-800 text-base font-bold font-roboto py-2 mt-10">Submit</button>

            {modal && (
                <div className="npmodal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <h2 className='font-roboto font-bold text-center'>
                            Package Successfully Added!
                        </h2>
                        <p>
              Check{" "}
              <Link href={'/customer-data'} className="font-source-sans-pro underline text-indigo-600">
                Customer Data
              </Link>{" "}
              or 
              Add New Package
            </p>
                        <button className="close-modal" onClick={toggleModal}>
                            <RiCloseCircleFill size={25} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
