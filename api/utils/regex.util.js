exports.emailRegex = (str) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(str);
};

exports.passwordRegex = (str) => {
  const passwordSpecCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1}/;
  const passwordNumRegex = /[0-9]{1}/;

  return (
    data.password.length > 7 &&
    passwordSpecCharRegex.test(data.password) &&
    passwordNumRegex.test(data.password)
  );
};
