export const Box = ({ children, ...props }) => {
  return <div style={{
    border: '1px solid black',
    margin: 10,
    padding: 10,
  }} {...props}>{children}</div>
}
