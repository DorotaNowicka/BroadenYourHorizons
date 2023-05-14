function Button({ children, type, onClick, color = "#225a61", ...otherProps }) {
  return (
    <button className="Button" type={type} onClick={onClick} {...otherProps}>
      {children}
    </button>
  );
}

export default Button;
