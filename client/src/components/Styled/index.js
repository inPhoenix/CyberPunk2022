import styled from "styled-components"


export const ButtonBar = styled.div`
  display: flex;
  justify-content: ${props => (props.right ? "flex-end" : "space-evenly")}
  margin-bottom: 10px;
  margin-top: 20px;
`
