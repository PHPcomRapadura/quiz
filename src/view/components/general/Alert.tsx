export function Warning ({ strong = '', messsage = ''}) {
  return (
    <div className="alert alert-dismissible alert-warning">
      <strong>{strong}</strong> {messsage}
    </div>
  )
}
