export function Warning ({ strong = '', message = 'Whops!'}) {
  return (
    <div className="alert alert-dismissible alert-warning">
      {strong && (<strong>{strong}</strong>)} {message}
    </div>
  )
}
