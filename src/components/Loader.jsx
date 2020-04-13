import React from "react";
export default props => <div className={`loader ${props.visible ? "d-block" : "d-none"}`}>
    <h3 className="my-auto">Carregando...</h3>
</div>