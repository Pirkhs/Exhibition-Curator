import { useState } from 'react'
import '../styles/Modal.css'


export default function Modal ({msg, funcConfirm, isModalOpen, handleModalOpenState}) {

    return isModalOpen ? (
        <div className="container-modal">
            <section className="modal">
                <p className="modal-heading"> Are you sure? </p>
                <p> {msg} </p>
                <span className="buttons"> 
                    <button onClick = {() => handleModalOpenState(false)} className="button reject"> No </button> 
                    <button onClick = {() => funcConfirm()} className="button accept"> Yes </button> 
                </span>
            </section>
        </div> 
    )
    :
    null
}