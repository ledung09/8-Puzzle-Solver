export function getTo(idx1, idx2) {
  // idx1 -> idx2
  // console.log(idx1)
  // console.log(idx2)
  if (idx1 - idx2 === 1) return [1,0]
  if (idx1 - idx2 === -1) return [-1,0]  
  if (idx1 > idx2 ) return [0,1]
  return [0,-1]
}

export function Guider() {
  return (
    <div>Guider</div>
  )
}
