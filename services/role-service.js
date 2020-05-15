function isRecruiter(user) {
  if (user.roles.includes('ROLE_RECRUITER')) {
    return true;
  }

  return false;
}

export {isRecruiter};
