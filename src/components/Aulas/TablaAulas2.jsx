import React, {useState, useEffect} from "react";
import "devextreme/dist/css/dx.light.css";
import * as Api from "../Api.js";
import DataGrid, {Editing, Column, Button, OperationDescriptions, Paging, RequiredRule, Pager, Popup} from "devextreme-react/data-grid";
import {Form} from "react-bootstrap";
import {Item} from "devextreme-react/form";
import CustomStore from "devextreme/data/custom_store";
import {FilterRow} from "devextreme-react/tree-list";
import ModificarAula from './ModificarAula'
import NuevaAula from './NuevaAula'
import Swal from "sweetalert2";

const filtros = ["contains", "="];

const columnas = [
    {
        dataField: "nombre",
        width: 200,
        caption: "Nombre del aula",
    },
    {
        dataField: "capacidadConAforo",
        width: 200,
        caption: "Capacidad",
    },
    {
        dataField: "nombreEdificio",
        width: 250,
        caption: "Edificio",
    },
    {
        dataField: "nombreSede",
        width: 250,
        caption: "Sede",
    },
];

const TablaAulas2 = () => {
    // * Parametros *
    const [showModificar, setShowModificar] = useState(false);
    const [showAgregar, setShowAgregar] = useState(false);
    const [aulaSeleccionada, setAulaSeleccionada] = useState();

    // * Eventos *
    const handleAgregarClick = () => {
        setShowAgregar(!showAgregar);
    };
    const handleEditarClick = (data) => {
        setAulaSeleccionada(data);
        setShowModificar(!showModificar);
    };
    const handleBorrarClick = (data) => {
        Swal.fire({
            title: "¿Borrar aula?",
            text: "Esta acción eliminará todas las sesiones asignadas a la misma.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borrar",
            cancelButtonText: "No, cancelar",
        }).then((res) => {
            if (res.isConfirmed) {
                Api.deleteAula(data.idAula);
            }
        });
    };

    const handleCloseModificar = () => {
        setShowModificar(false);
    };
    const handleCloseAgregar = () => {
        setShowAgregar(false);
    };

    const onToolbarPreparing = (e) => {
        let toolbarItems = e.toolbarOptions.items;
        // Modifies an existing item
        toolbarItems.forEach(function (item) {
            if (item.name === "addRowButton") {
                item.options = {
                    icon: "add",
                    hint: "Agregar",
                    onClick: handleAgregarClick,
                };
            }
        });
    };
    const [data] = useState(
        new CustomStore({
            key: "idAula",

            load: () => {
                console.log(Api.getAulas());
                return Api.getAulas();
            },
            update: (key, values) => {
                console.log(key, values);
                Api.updateAula(key, values);
            },
            remove: (key) => {
                Api.deleteAula(key);
            },
        })
    );

    // * useEffects *

    return (
        <div>
            <NuevaAula show={showAgregar} handleClose={handleCloseAgregar} />
            {aulaSeleccionada ? <ModificarAula aula={aulaSeleccionada} show={showModificar} handleClose={handleCloseModificar} /> : null}
            <DataGrid
                id="dataGrid"
                onToolbarPreparing={onToolbarPreparing}
                refresh={true}
                dataSource={data}
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnAutoWidth={false}
                showBorders={true}
                width='100%'
            >
                <Paging enabled={true} defaultPageSize={10} />
                <Pager enabled={true} showNavigationButtons={true} showInfo={true} />
                <FilterRow visible={true} resetOperationText="Deshacer filtros">
                    <OperationDescriptions contains="Contiene" equal="Busqueda Exacta" />
                </FilterRow>
                <Editing useIcons={true} allowAdding={true} allowUpdating={true} allowDeleting={true} />
                <Column type="buttons" caption="Acciones">
                    <Button name="edit" hint="Editar" onClick={(event) => handleEditarClick(event.row.data)} />
                    <Button name="delete" hint="Borrar" onClick={(event) => handleBorrarClick(event.row.data)} />
                </Column>
                {columnas.map((c) => {
                    return (
                        <Column dataField={c.dataField} caption={c.caption} width={c.width} filterOperations={filtros}>
                            <RequiredRule message={`${c.caption} es un campo obligatorio.`} />
                        </Column>
                    );
                })}
            </DataGrid>
        </div>
    );
};

export default TablaAulas2;
