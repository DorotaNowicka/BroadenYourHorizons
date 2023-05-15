function Button({ children, type, onClick, color = "#225a61", ...otherProps }) {
  return (
    <button type={type} className="Button" onClick={onClick} {...otherProps}>
      {children}
    </button>
  );
}

export default Button;
