import React from "react";

const PlayerCard = ({ id,data }) => {
  const image_url = `https://picsum.photos/id/${id}/200/300`;
//   I have to use this image link because the given image link is not workin document

  return (
    <div>
      <img src={image_url} alt="Sample photo" />
      <p style={{color:"red",fontSize:"25px"}}>{data.PFName}</p>
    </div>
  );
};

export default PlayerCard;
