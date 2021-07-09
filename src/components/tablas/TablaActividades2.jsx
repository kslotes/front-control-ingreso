import React from "react";
import "devextreme/dist/css/dx.light.css";
import * as Api from "../Api.js";
import DataGrid, {Editing, Column, Button, OperationDescriptions, Paging} from "devextreme-react/data-grid";
import CustomStore from 'devextreme/data/custom_store';
import {useState, useEffect} from "react";
import {FilterRow} from "devextreme-react/tree-list";

const TablaActividades2 = () => {
    const data = new CustomStore({
        key: 'idActividad',
        load: () => Api.getActividades(),
        update: (key, values) => {console.log(values);Api.updateActividad(key, values)},
    });
   
    const filtros = ["contains", "="];

    const columnas = [
        {
            dataField: "nombreActividad",
            width: 200,
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


    return (
        <div>
            <DataGrid id="dataGrid" dataSource={data} allowColumnReordering={true} allowColumnResizing={true} columnAutoWidth={true} showBorders={true}>
                <Paging enabled={true}/>
                <FilterRow visible={true} resetOperationText="Deshacer filtros">
                    <OperationDescriptions contains="Contiene" equal="Busqueda Exacta"/>
                </FilterRow>
                <Editing mode="row" useIcons={true} allowUpdating={true} allowDeleting={true} />
                <Column type="buttons" caption="Acciones">
                    <Button name="edit" hint="Editar" />
                    <Button name="delete" hint="Borrar" />
                </Column>
                {columnas.map((c) => (
                    <Column dataField={c.dataField} caption={c.caption} width={c.width} filterOperations={filtros}/>
                ))}
            </DataGrid>
        </div>
    );
};

export default TablaActividades2;
