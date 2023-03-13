import React from "react";
import { useParams } from "react-router-dom"

export default function ExperimenterLog() {
  const { id } = useParams()

  return (
    <h2 class="text-4xl font-bold mb-2 text-black">
    This is the id I entered: {id}.
    </h2>
  )
}
