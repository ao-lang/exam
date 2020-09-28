export default {
    //查找题目
    STR(state, s) {
        console.log('开始');
        state.str = [];
        console.log(state.single);
        state.single.forEach(v => {
            if (v.title.indexOf(s) != -1) {
                state.str.push(v)
            }
        })
        console.log(state.multipart);
        state.multipart.forEach(v => {
            if (v.title.indexOf(s) != -1) {
                state.str.push(v)
            }
        })
        console.log(state.str);
    }
}