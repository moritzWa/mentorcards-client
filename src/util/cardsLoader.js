import React from "react"
import ContentLoader from "react-content-loader"

const cardsLoader = (props) => (
  <ContentLoader
    viewBox="0 0 1360 900"
    height={900}
    width={1360}
    speed={1.5}
    {...props}
  >
    <rect x="50" y="20" rx="10" ry="10" width="260" height="190" />
    <rect x="50" y="285" rx="10" ry="10" width="260" height="18" />
    <rect x="150" y="325" rx="10" ry="10" width="160" height="20" />
    <rect x="50" y="240" rx="10" ry="10" width="260" height="18" />
    <rect height="190" rx="10" ry="10" width="260" x="400" y="19" />
    <rect height="18" rx="10" ry="10" width="260" x="400" y="240" />
    <rect height="18" rx="10" ry="10" width="260" x="400" y="285" />
    <rect height="20" rx="10" ry="10" width="160" x="500" y="325" />
    <rect height="190" rx="10" ry="10" width="260" x="50" y="415" />
    <rect height="18" rx="10" ry="10" width="260" x="50" y="635" />
    <rect height="18" rx="10" ry="10" width="260" x="50" y="680" />
    <rect height="20" rx="10" ry="10" width="160" x="150" y="720" />
    <rect height="190" rx="10" ry="10" width="260" x="399" y="414" />
    <rect height="18" rx="10" ry="10" width="260" x="400" y="635" />
    <rect height="18" rx="10" ry="10" width="260" x="400" y="680" />
    <rect height="20" rx="10" ry="10" width="160" x="500" y="720" />
    <rect height="190" rx="10" ry="10" width="260" x="745" y="21" />
    <rect height="18" rx="10" ry="10" width="260" x="745" y="242" />
    <rect height="18" rx="10" ry="10" width="260" x="745" y="287" />
    <rect height="20" rx="10" ry="10" width="160" x="845" y="327" />
    <rect height="190" rx="10" ry="10" width="260" x="744" y="416" />
    <rect height="18" rx="10" ry="10" width="260" x="745" y="637" />
    <rect height="18" rx="10" ry="10" width="260" x="745" y="682" />
    <rect height="20" rx="10" ry="10" width="160" x="845" y="722" />
  </ContentLoader>
)

export default cardsLoader
