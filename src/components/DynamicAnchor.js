import styled from "styled-components";

const DynamicAnchor = styled.span`
  display: block;
  position: relative;
  visibility: hidden;
  top: -70px;
  @media (min-width: 992px) {
    top: -90px;
  }
`;
export default DynamicAnchor;
