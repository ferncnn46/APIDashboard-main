export default async function({ $auth, redirect }){

    const user = $auth.user;
    if(user.isAdmin !== true){
        return redirect('/');
    };

}