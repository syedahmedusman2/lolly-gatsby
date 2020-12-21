import React from "react";
import Lolly from "../component/Lolly";
import { gql, useMutation, useQuery } from "@apollo/client";
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import shortId from "shortid";
import {navigate} from 'gatsby'
import ErrorMsg from "../Utils/ErrorMsg";



// export const GET_LOLLY_BY_SLUG = gql`
//   query getLollyBySlug($path: String!) {
//     getLollyBySlug(path: $path) {
//       recipientName
//       message
//       senderName
//       topColor
//       mediumColor
//       bottomColor
//       path
//     }
//   }
// `


const CREATE_LOLLY_MUTATION = gql`
  mutation createLolly(
    $recipientName: String!
    $message: String!
    $senderName: String!
    $topColor: String!
    $mediumColor: String!
    $bottomColor: String!
    $path: String!
  ) {
    createLolly(recipientName: $recipientName, message: $message, senderName: $senderName, topColor: $topColor, mediumColor: $mediumColor, bottomColor: $bottomColor, path: $path)
     {
      message
      }
  }
`;

const initialValues = {
    to: "",
    message: "",
    from: "",
  };
  
  const validationSchema = Yup.object({
    to: Yup.string().required("Recipient name is required"),
  
    message: Yup.string()
      .required("Message is required")
      .max(500, "Message should be less than 500 character"),
    from: Yup.string().required("Sender name is Required"),
  });


const CreateLolly = () => {

  const [fillLollyTop, setfillLollyTop] = React.useState("#d52358");
  const [fillLollyMiddle, setfillLollyMiddle] = React.useState("#e95946");
  const [fillLollyBottom, setfillLollyBottom] = React.useState("#deaa43");

  const [createLolly] = useMutation(CREATE_LOLLY_MUTATION);
  // const { data, error, loading } = useQuery(GET_LOLLY_BY_SLUG);

 const onSubmit = async (values, actions) => {
  const slug = shortId.generate();
  const result = await createLolly({
    variables: {
      recipientName: values.to,
      message: values.message,
      senderName: values.from,
      topColor: fillLollyTop,
      mediumColor: fillLollyMiddle,
      bottomColor: fillLollyBottom,
      path: slug.toString(),
    },
  });

  await actions.resetForm({
    values: {
      to: "",
      message: "",
      from: "",
    },
  });


  await navigate(`/lolly/${slug}`);
};

  return (
    
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <div>
        <Lolly
          fillLollyTop={fillLollyTop}
          fillLollyMiddle={fillLollyMiddle}
          fillLollyBottom={fillLollyBottom}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          height: "30vh"
        }}
      >
          <input
            type="color"
            value={fillLollyTop}
            onChange={(e) => setfillLollyTop(e.target.value)}
            style={{color: {fillLollyBottom} , cursor: "pointer", width: "35px", height: "35px", borderRadius: "20%"}}
          />
       
          <input
            type="color"
            value={fillLollyMiddle}
            onChange={(e) => setfillLollyMiddle(e.target.value)}
            style={{color: {fillLollyBottom} , cursor: "pointer", width: "35px", height: "35px", borderRadius: "20%"}}
          />
        
        
          <input
            type="color"
            value={fillLollyBottom}
            style={{color: {fillLollyBottom} , cursor: "pointer", width: "35px", height: "35px", borderRadius: "20%"}}
            onChange={(e) => setfillLollyBottom(e.target.value)}
          />
        
      </div>
      <div >
        <Paper style={{
              width: "400px",
              margin: "0 auto",
              padding: "30px 0px ",
            }}>
        <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form style={{padding: "14px"}}>
                <Field
                  as={TextField}
                  id="To"
                  type="text"
                  label="To"
                  variant="outlined"
                  name="to"
                  fullWidth
                  style={{ marginTop: "10px" }}
                />
                <ErrorMessage name="to" component={ErrorMsg} />

                <Field
                  as={TextField}
                  id="Message"
                  label="Message"
                  multiline
                  type="text"
                  rows={4}
                  fullWidth
                  variant="outlined"
                  name="message"
                  style={{ marginTop: "10px" }}
                />
                <ErrorMessage name="message" component={ErrorMsg} />

                <Field
                  as={TextField}
                  id="name"
                  type="text"
                  name="from"  
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: "10px" }}
                />
                <ErrorMessage name="from" component={ErrorMsg} />

                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  type="submit"
                  style={{ marginTop: "10px" }}
                >
                  SEND YOUR VIRTUAL LOLLY
                </Button>
              </Form>
            </Formik>
        </Paper>
      </div>
    </div>
  );
};

export default CreateLolly;