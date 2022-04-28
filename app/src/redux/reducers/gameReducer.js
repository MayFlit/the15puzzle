import { INIT_GAME, CHOISE_GAME, MOVE_GAME } from "../actionTypes/gameAT";

const initialState = { game: [], coord: [], solved: {solve: false} }

export const gameReducer = (state = initialState, action) => {
    switch (action.type) {

        case INIT_GAME:

            // Инициализируем массив доступных для заполнения чисел.
            let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
            let inPole = []



            // Функция, которая проверяет можно ли собрать пятнашки.
            function valid(pole) {

                // Заполняем ячейки числами в случайном порядке.
                for (let i = 0; i <4; i++) {
                    pole.push(new Array(4))
                    for (let j = 0; j < 4; j++) {
                        if (arr.length === 0) {

                            // Отрисовываем пустую клетку в правой нижней ячейке.
                            pole[i][j] = {id: '', lalaila: false, coords: [i,j]};
                        } else {
                            const index = Math.floor(Math.random() * arr.length)
                            pole[i][j] = {id: arr[index], lalaila: false, coords: [i,j]};
                            arr.splice(index, 1)
                        }
                    }
                }




                // Инициализируем счетчик для сравнения пар ячеек.
                let counter = 0;
                const currentPole = [...pole].flat()


                // Проверяем разницу между текущей ячейкой и всеми последующими.
                let j = 0
                for (let i = 0; i < currentPole.length; i++) {
                    j = i + 1;
                    for (; j < currentPole.length; j++) {

                        console.log(i, '<<<<<<<<<< i')
                        console.log(j, '<<<<<<<<<< j')
                        console.log(currentPole[i].id, 'i ID <<<<<<<<<<<')
                        console.log(currentPole[j].id, 'j ID <<<<<<<<<<<')
                        console.log(currentPole[i].id - currentPole[j].id, '<<<<<<<<<< Разница')

                        // Если текущее число меньше, чем какое-либо из следующих, увеличиваем счетчик.
                        if (currentPole[i].id - currentPole[j].id > 0 && currentPole[i].id !== '' && currentPole[j].id !== '') {
                            counter += 1;
                            console.log(counter, '<<<<<<<<< Каунтер')
                        }
                    }
                }


                // Добавляем к счетчику номер ряда, в котором расположена пустая ячейка.
                counter = counter + 4;

                // Если счетчик четный, то все в порядке и пятнашки решаемы.
                // Если нет, то вызываем функцию заново, до тех пор, пока не сгенерируется решаемая задача.
                if (counter % 2 === 0) {
                    return pole
                } else {
                    inPole = []
                    arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
                   return valid(inPole)
                }
            }

            const validPole = valid(inPole)

            // Отмечаем доступные для передвижения ячейки.
            for (let i = 0; i <4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (validPole[i][j].id === '') {
                        if (i + 1 < 4) validPole[i + 1][j].lalaila = true
                        if (i - 1 >= 0) validPole[i - 1][j].lalaila = true
                        if (j + 1 < 4) validPole[i][j + 1].lalaila = true
                        if (j - 1 >= 0) validPole[i][j - 1].lalaila = true
                    }
                }
            }

            return { ...state, game: validPole }

        case CHOISE_GAME:

            // Ищем пустую ячейку.
            let coord;
            for (let i = 0; i <4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (state.game[i][j].id === '' &&
                        (((state.game[i][j].coords[0] + 1 < 4) && state.game[state.game[i][j].coords[0] + 1][state.game[i][j].coords[1]].lalaila) ||
                        ((state.game[i][j].coords[0] - 1 >= 0) && state.game[state.game[i][j].coords[0] - 1][state.game[i][j].coords[1]].lalaila) ||
                        ((state.game[i][j].coords[1] + 1 < 4) && state.game[state.game[i][j].coords[0]][state.game[i][j].coords[1] + 1].lalaila) ||
                        ((state.game[i][j].coords[1] - 1 >= 0) && state.game[state.game[i][j].coords[0]][state.game[i][j].coords[1] - 1].lalaila)
                    )) {
                        coord = [state.game[i][j].coords]
                    }
                }
            }

            return { ...state, game: state.game.map(x => x.map(x => {


                    // Если ячейка доступна для передвижения, то отмечаем ее как пустую.
                    // А на координаты пустой выставляем цифру с текущей ячейки.
                    if (x.id === action.payload && x.lalaila) {
                        x.id = ''

                        const [i, j] = coord[0]
                        state.game[i][j].id = action.payload
                        return x
                    }
                    return x
                }))}

        case MOVE_GAME:

            // Обнуляем все отметки для перемещения
            for (let i = 0; i <4; i++) {
                for (let j = 0; j < 4; j++) {
                    state.game[i][j].lalaila = false;
                }
            }

            // Выствялем их заново
            for (let i = 0; i <4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (state.game[i][j].id === '') {
                        if (i + 1 < 4) state.game[i + 1][j].lalaila = true
                        if (i - 1 >= 0) state.game[i - 1][j].lalaila = true
                        if (j + 1 < 4) state.game[i][j + 1].lalaila = true
                        if (j - 1 >= 0) state.game[i][j - 1].lalaila = true
                    }
                }
            }


            // Инициализируем структуру решенной задачи.
            const solve = '123456789101112131415'



            // Сравниваем текущее состояние доски с правильным решением.
            function equalArrays(a,b) {
                let result = ''
                    b.map(obj => {
                        for (let key in obj) {
                            result+= obj[key].id
                        }
                    })

                if (a === result.trim()) {
                    return true;
                } else {
                    return false
                }
            }


            // Если задача решена, то ставим об этом отметку.
            if (equalArrays(solve, state.game)) {
                state.solved.solve = true;
            }

        default:
            return state
    }
}


