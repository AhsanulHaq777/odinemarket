import {defineField, defineType} from "sanity"

export const product=defineType({
    name: "product",     //this will also be used to fetch data. all the data will reside here. data will return in JSON and its key will be this
    type: "document",   // this type of my schema which means it is document, it is a model. this document/model will contain fields in it.
                        // these are just the data types in sanity this includes document, string etc
    title: "Product",   // this is name of schema/model/document that will be shown on studio under document list
    fields: [           //this describes what are the different fields will be available in this document or model
       defineField({
            name: "title",      //this will be shown as a field key in JSON result
            title: "Product Title",     //this will be shhown as a input field name
            type: "string"      //type of the data
       }),
       defineField({
            name: "description",
            title: "Product Description",
            type: "string"
       }),
       defineField({
            name: "price",
            title: "Product Price",
            type: "number"
       }),
       defineField({
            name: "image",
            title: "Product Image",
            type: "image"
       }),
       defineField({
          name: "item",
          title: "Product Item",
          type: "string"
     }),
       defineField({
          name: "category",
          title: "Product Category",
          type: "reference",
          to: [
               {
                    type: "category"
               }
          ]
       })
    ]
})