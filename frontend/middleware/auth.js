export default function ({ store, redirect, route }) {
  if (store.getters['robotic_system/isAuth']) {
    switch (route.name) {
      case 'login':
        return redirect('/')
      // case 'class-rooms':
      //   if (!store.getters['robotic_system/isTeacher']) {
      //     return redirect('/')
      //   }
      //   break
    }
  } else if (route.name !== 'login') {
    return redirect('login')
  }
}
