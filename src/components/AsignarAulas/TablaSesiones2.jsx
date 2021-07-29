import React, {useState, useEffect} from "react";
import "devextreme/dist/css/dx.light.css";
import * as Api from "../Api.js";
import DataGrid, {Editing, Column, Button, OperationDescriptions, Paging, RequiredRule, Pager} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";
import {FilterRow} from "devextreme-react/tree-list";
import ModalAsignarAula from "./ModalAsignarAula";
import Swal from "sweetalert2";
import ModificarSesion from "./ModificarSesion.jsx";

const filtros = ["contains", "="];

const columnas = [
    {
        dataField: "fecha",
        width: 200,
        caption: "Fecha",
        sortOrder: "desc",
    },
    {
        dataField: "dia",
        width: 200,
        caption: "Dia",
    },
    {
        dataField: "nombreActividad",
        width: 500,
        caption: "Actividad",
    },
    {
        dataField: "horaInicio",
        width: 250,
        caption: "Hora de inicio",
    },
    {
        dataField: "horaFin",
        width: 250,
        caption: "Hora de Fin",
    },
];

const TablaSesiones2 = () => {
    // * Parametros *
    const [showModificar, setShowModificar] = useState(false);
    const [showAgregar, setShowAgregar] = useState(false);
    const [sesionSeleccionada, setSesionSeleccionada] = useState();

    // * Eventos *
    const handleAgregarClick = () => {
        setShowAgregar(!showAgregar);
    };
    const handleEditarClick = (data) => {
        setSesionSeleccionada(data);
        setShowModificar(!showModificar);
    };
    const handleBorrarClick = (data) => {
        Swal.fire({
            title: "¿Borrar clase?",
            text: "Esta acción eliminará todos los permisos que los participantes han solicitado.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borrar",
            cancelButtonText: "No, cancelar",
        }).then((res) => {
            if (res.isConfirmed) {
                Api.deleteSesion(data.idSesionPresencial);
            }
        });
    };

    const handleCloseModificar = () => {
        setShowModificar(false);
    };
    const handleCloseAgregar = () => {
        setShowAgregar(false);
    };

    const [data] = useState(
        new CustomStore({
            key: "idSesionPresencial",

            load: () => {
                return Api.getSesiones();
            },
        })
    );

    // * useEffects *

    return (
        <div>
            {showModificar ? <ModificarSesion showModal={showModificar} handleClose={handleCloseModificar} sesion={sesionSeleccionada} /> : null}
            <DataGrid
                id="dataGrid"
                refresh={true}
                dataSource={data}
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                width='100%'
                showBorders={true}
            >
                <Paging enabled={true} defaultPageSize={10} />
                <Pager enabled={true} showNavigationButtons={true} showInfo={true} />
                <FilterRow visible={true} resetOperationText="Deshacer filtros">
                    <OperationDescriptions contains="Contiene" equal="Busqueda Exacta" />
                </FilterRow>
                <Editing useIcons={true} allowUpdating={true} allowDeleting={true} />
                <Column type="buttons" caption="Acciones">
                    <Button name="edit" hint="Editar" onClick={(event) => handleEditarClick(event.row.data)} />
                    <Button name="delete" hint="Borrar" onClick={(event) => handleBorrarClick(event.row.data)} />
                </Column>
                {columnas.map((c) => {
                    return (
                        <Column sortOrder={c.sortOrder} dataField={c.dataField} caption={c.caption} width={c.width} filterOperations={filtros}>
                            <RequiredRule message={`${c.caption} es un campo obligatorio.`} />
                        </Column>
                    );
                })}
            </DataGrid>
        </div>
    );
};

export default TablaSesiones2;
