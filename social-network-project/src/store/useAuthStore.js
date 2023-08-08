import create from 'zustand';

const useAuthStore = create((set) => {
  const isLoggedInFromLocalStorage = localStorage.getItem('isLoggedIn') === 'true';
  const logged_idFromLocalStorage = localStorage.getItem('logged_id');

  return {
    user: null,
    rol: null,
    isLoggedIn: isLoggedInFromLocalStorage,
    logged_id: logged_idFromLocalStorage,
    profilePicture: 'https://static.vecteezy.com/system/resources/previews/002/519/144/non_2x/social-media-avatar-free-vector.jpg',

    login: (userData) =>
      set((state) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('logged_id', userData.id)
        localStorage.setItem('userName', userData.user_name)

        return {
          ...state,
          user: userData,
          rol: getRoleNameFromRoleId(userData.id_rol),
          isLoggedIn: true,
          logged_id: userData.id,
          profilePicture: userData.profile_picture,
        };
      }),

    logout: () =>
      set((state) => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('logged_id')

        return {
          ...state,
          user: null,
          rol: null,
          isLoggedIn: false,
        };
      }),

    updateProfilePicture: (url) =>
      set((state) => ({
        ...state,
        profilePicture: url,
      })),
  };
});

const getRoleNameFromRoleId = (roleId) => {
    if (roleId === 1) {
        return 'user';
    }
    if(roleId === 2) {
        return 'admin';
    }
};

export default useAuthStore;
