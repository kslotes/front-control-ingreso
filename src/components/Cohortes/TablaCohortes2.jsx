import React from "react";
import "devextreme/dist/css/dx.light.css";
import * as Api from "../Api.js";
import DataGrid, {Editing, Column, Button, OperationDescriptions, Paging, RequiredRule, Pager} from "devextreme-react/data-grid";

import CustomStore from "devextreme/data/custom_store";
import {useState, useEffect} from "react";
import {FilterRow} from "devextreme-react/tree-list";
import NuevoCohorte from './NuevoCohorte'
import Swal from "sweetalert2";

const TablaCohortes2 = () => {
    const [showModalModificar, setshowModalModificar] = useState(false);
    const [showModalAgregar, setShowModalAgregar] = useState(false);
    const handleCloseModificar = () => setshowModalModificar(false);
    const handleHideModificar = () => setshowModalModificar(false);
    const handleCloseAgregar = () => setShowModalAgregar(false);
    const handleHideAgregar = () => setShowModalAgregar(false);

    const handleShowAgregar = () => {
        setShowModalAgregar(true);
        console.log("Agregar");
    };
    const handleShowEditar = (row) => {
        console.log("Editar");
    };
    const handleShowBorrar = (row) => {
        console.log("Eliminar");
    };
    const [data] = useState(
        new CustomStore({
            key: "idCohorte",
            insert: (values) => {
                console.log(values);
            },
            load: () => {
                console.log(Api.getCohortes());
                return Api.getCohortes();
            },
            update: (key, values) => {
                console.log(key, values);
            },
            remove: (key) => {
                console.log(key);
            },
        })
    );

    const filtros = ["contains", "="];

    const columnas = [
        {
            dataField: "idCohorte",
            width: 50,
            caption: "Id",
        },
        {
            dataField: "nombreCohorte",
            width: 300,
            caption: "Cohorte",
        },
        {
            dataField: "sede.nombre",
            width: 300,
            caption: "Sede",
        },
        {
            dataField: "fechaInicio",
            width: 250,
            caption: "Fecha de Inicio",
        },
        {
            dataField: "fechaFin",
            width: 250,
            caption: "Fecha de Fin",
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
                    onClick: handleShowAgregar,
                };
            }
        });
    };

    return (
        <div>
            <NuevoCohorte showModal={showModalAgregar} handleClose={handleCloseAgregar} handleHide={handleHideAgregar} />

            <DataGrid
                id="dataGrid"
                onToolbarPreparing={onToolbarPreparing}
                refresh={true}
                dataSource={data}
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnAutoWidth={false}
                showBorders={true}
            >
                <Paging enabled={true} defaultPageSize={10} />
                <Pager enabled={true} showNavigationButtons={true} showInfo={true} />
                <FilterRow visible={true} resetOperationText="Deshacer filtros">
                    <OperationDescriptions contains="Contiene" equal="Busqueda Exacta" />
                </FilterRow>
                <Editing useIcons={true} allowAdding={true} allowUpdating={true} allowDeleting={true}></Editing>
                <Column type="buttons" caption="Acciones">
                    <Button name="edit" hint="Editar" onClick={(event) => handleShowEditar(event.row.data)} />
                    <Button name="delete" hint="Borrar" onClick={(event) => handleShowBorrar(event.row.data)} />
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

export default TablaCohortes2;
