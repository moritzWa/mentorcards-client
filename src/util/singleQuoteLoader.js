import React from "react"
import ContentLoader from "react-content-loader"

const singleQuoteLoader = (props) => (
  <ContentLoader
    viewBox="0 0 900 900"
    height={900}
    width={900}
    speed={2}
    {...props}
  >
    <circle cx="240" cy="459" r="30" />
    <rect
      transform="rotate(0,335,392.5)"
      x="286"
      y="438"
      rx="10"
      ry="10"
      width="140"
      height="20"
    />
    <rect x="209" y="15" rx="10" ry="10" width="400" height="194" />
    <rect
      transform="rotate(0,335,392.5)"
      x="286.4"
      y="470"
      rx="10"
      ry="10"
      width="100"
      height="20"
    />
    <rect
      height="20"
      rx="10"
      ry="10"
      transform="rotate(0,335,392.5)"
      width="274"
      x="274.4"
      y="240"
    />
    <rect
      transform="rotate(0,335,392.5)"
      height="20"
      rx="10"
      ry="10"
      width="274"
      x="275.8"
      y="280"
    />
    <rect
      transform="rotate(0,335,392.5)"
      height="20"
      rx="10"
      ry="10"
      width="274"
      x="275.2"
      y="320"
    />
    <rect
      height="20"
      rx="10"
      ry="10"
      transform="rotate(0,335,392.5)"
      width="100"
      x="441.8"
      y="364"
    />
    {/* <!--  --> */}
    <circle cx="244.2" cy="632.2" r="41.3" />
    <rect rx="10" x="304.9" y="589.5" width="125.5" height="20" />
    <rect rx="10" x="304.9" y="624.7" width="296" height="20" />
    <rect rx="10" x="304.9" y="657.8" width="253.5" height="20" />
    {/* <!--  --> */}
    <circle cx="246.7" cy="769.5" r="41.3" />
    <rect rx="10" height="20" width="125.5" x="307.4" y="725.9" />
    <rect rx="10" x="307.4" y="761" width="215" height="20" />
    <rect rx="10" x="307.4" y="794.2" width="253.5" height="20" />
  </ContentLoader>
)

export default singleQuoteLoader
