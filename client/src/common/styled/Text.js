import styled from "styled-components"

export const Text = styled.div`
  padding: 0 20px 5px 0;
  color: ${props => (props.color ? props.color : "aqua")};
`
