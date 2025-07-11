const getInitials = (userData) => {
    const fname = userData?.user?.user?.fname || '';
    const lname = userData?.user?.user?.lname || '';
    return `${fname[0] || ''}${lname[0] || ''}`.toUpperCase();
  };
  