import React from "react"
import Lolly from "../component/Lolly"
import { useQuery, gql } from "@apollo/client"

const GET_LOLLY = gql`
  query getLollyBySlug($path: String!) {
    getLollyBySlug(path: $path) {
        recipientName
        senderName
        message
        topColor
        mediumColor
        bottomColor
        path
    }
  }
`

export default function NotFound(x) {
  console.log(x)
  var queryLollies = x.location.pathname.slice(0, 7)
  var queryPath = x.location.pathname.slice(7)
    console.log("querylolly"+ queryLollies,"querypath" + queryPath)
  const { loading, error, data } = useQuery(GET_LOLLY, {
    variables: { path: queryPath },
  })
  if (error) {
    console.log("There is a Error in the page")
  }

  console.log(data)
  
  return (
    <div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : !!data && queryLollies === "/lolly/" ? (
        <div>
          <h5 className="sharableLinkContainer">Your sharable link: </h5>{" "}
          <span className="sharableLink">
            {" "}
            {`https://pedantic-williams-05140f.netlify.app/lolly/${data.getLollyBySlug.path}`}
          </span>
          <div className="recievedContentContainer">
            <Lolly
              fillLollyTop={data.getLollyBySlug.topColor}
              fillLollyMiddle={data.getLollyBySlug.mediumColor}
              fillLollyBottom={data.getLollyBySlug.bottomColor}
            />

            <div className="recievedTextContainer">
              <h3>HI {data.getLollyBySlug.recipientName.toUpperCase()}</h3>
              <p>{data.getLollyBySlug.message}</p>
              <h4>From: {data.getLollyBySlug.senderName}</h4>
            </div>
          </div>
        </div>
      ) : (
        <div className="pageNotFound">We are deeply Sorry that the page is not found</div>
      )}
    </div>
  )
}