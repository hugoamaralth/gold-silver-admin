import React from "react";
import { BtnSaveModal, BtnCloseModal } from "../components/Button"

export default props => <div className="w-100 h-100 position-fixed  m-0 p-0 modal-new">

    <div className='w-25 mx-auto mt-5 p-4 rounded border bg-light' >
        <div className="row m-0 p-0">
            <h3 className="text-center pt-3 text-primary text-center w-100"> {props.textNew}</h3>
        </div>
        <div className="row m-0 p-0">
            <input type="text" className=" my-3 text-primary form-control" onChange={e => props.onChange(e)} />
        </div>

        <BtnSaveModal saveFn={props.saveFn} contentModal={props.modalContent} />
        <BtnCloseModal closeFn={() => props.closeModalFn} />
    </div>
</div>