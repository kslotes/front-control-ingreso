import React from "react";
import "devextreme/dist/css/dx.light.css";
import * as Api from "../Api.js";
import DataGrid, { Editing, Column, Button, OperationDescriptions, Paging, RequiredRule, Pager, Popup } from "devextreme-react/data-grid";
import { Form } from "react-bootstrap";
import { Item } from "devextreme-react/form";
import CustomStore from "devextreme/data/custom_store";
import { useState, useEffect } from "react";
import { FilterRow } from "devextreme-react/tree-list";
import { ModificarActividad } from "./ModificarActividad";
import deleteActividad from "./deleteActividad";
import NuevaActividad from "./NuevaActividad";
import Swal from "sweetalert2";

/*
    TODO: Quitar deleteActividad de este archivo y modularizarlo
*/
const TablaActividades2 = () => {
    const [showModalModificar, setshowModalModificar] = useState(false);
    const [showModalAgregar, setShowModalAgregar] = useState(false);
    const [actividadModificar, setActividadModificar] = useState();

    const handleCloseModificar = () => setshowModalModificar(false);
    const handleHideModificar = () => setshowModalModificar(false);
    const handleCloseAgregar = () => setShowModalAgregar(false);
    const handleHideAgregar = () => setShowModalAgregar(false);

    const handleEditarClick = (data) => {
        console.log(data);
        setActividadModificar(data);
        setshowModalModificar(!showModalModificar);
    };
    const handleAgregarClick = () => {
        setShowModalAgregar(!showModalAgregar);
    };
    const handleBorrarClick = (data) => {
        console.log(data);
        Swal.fire({
            title: "¿Borrar actividad?",
            text: "Esta acción eliminará todas las cursadas, horarios y sesiones asignadas a la misma.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borrar",
            cancelButtonText: "No, cancelar",
        }).then((res) => {
            if (res.isConfirmed) {
                Api.deleteActividad(data.idActividad);
            }
        });
    };

    const [dependencias, setDependencias] = useState([]);
    const [data] = useState(
        new CustomStore({
            key: "idActividad",
            load: () => {
                console.log(Api.getActividades());
                return Api.getActividades();
            },
            update: (key, values) => {
                console.log(key, values);
                Api.updateActividad(key, values);
            },
            remove: (key) => {
                Api.deleteActividad(key);
            },
        })
    );

    const filtros = ["contains", "="];

    const columnas = [
        {
            dataField: "nombreActividad",
            width: 400,
            caption: "Actividad",
        },
        {
            dataField: "nombreDependencia",
            width: 400,
            caption: "Dependencia",
        },
        {
            dataField: "nombrePropuesta",
            width: 300,
            caption: "Propuesta",
        },
    ];

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
    useEffect(() => {
        // Get all Dependencias from API
        Api.getDependencias()
            .then((data) => {
                setDependencias(data);
                console.log("Dependencias", dependencias);
            })
    }, [data]);

    return (
        <div>
            <NuevaActividad showModal={showModalAgregar} handleClose={handleCloseAgregar} handleHide={handleHideAgregar} />
            {actividadModificar ? <ModificarActividad actividad={actividadModificar} showModal={showModalModificar} handleClose={handleCloseModificar} handleHide={handleHideModificar} /> : null}
            <DataGrid
                id="dataGrid"
                onToolbarPreparing={onToolbarPreparing}
                refresh={true}
                dataSource={data}
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnAutoWidth={true}
                showBorders={true}
                width='100%'
            >
                <Paging enabled={true} defaultPageSize={10} />
                <Pager enabled={true} showNavigationButtons={true} showInfo={true} />
                <FilterRow visible={true} resetOperationText="Deshacer filtros">
                    <OperationDescriptions contains="Contiene" equal="Busqueda Exacta" />
                </FilterRow>
                <Editing useIcons={true} allowAdding={true} allowUpdating={true} allowDeleting={true}>
                    <Button name="add" hint="Agregar" onClick={() => console.log("Clicked")} />
                    <Popup closeOnOutsideClick={true} title="Datos de Actividad" showTitle={true} width={600} height={300} />
                    <Form>
                        <Item itemType="group" colCount={1} colSpan={2}>
                            <Item dataField="nombreActividad" required={true} />
                            <Item dataField="nombreDependencia" required={true} />
                            <Item dataField="nombrePropuesta" required={true} />
                        </Item>
                    </Form>
                </Editing>
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

export default TablaActividades2;
