const formComponents = import.meta.globEager('@/components/forms/**/*.vue');

let formComp = {};

Object.entries(formComponents).forEach((path,i) => {
    let name = path[0].replace('Form','').split("/").pop().replace('.vue','');
    formComp[name] = path[1].default;
});


// export formComp;
export default formComp;