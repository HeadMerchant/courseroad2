import moment from 'moment';
import Road from '../../src/components/Road.vue'
import Semester from '../../src/components/Semester.vue'
import { isMainThread } from 'worker_threads';
//import mockDate from './__mocks__/date';
//jest.mock('date');

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex);

const testDate = new Date('2019-09-14T11:01:58.135Z')
const mockDate = class extends Date {
    constructor(date) {
        return testDate;
    }
}

describe('Semester', () => {
    let store;

    beforeEach(() => {
        store = new Vuex.Store({
            state: {
                subjectsIndex: [0, 1],
                genericIndex: [0, 1, 2],
                subjectsInfo: ['a', 'b'],
                genericCourses: [0, 1, 2],
                activeRoad: 'a',
                currentSemester: 1,
                itemAdding: false,
                addingFromCard: false,
            },
            getters: {
                userYear: () => {return 1}
            },
            mutations: {
                addClass: () => {
                    return true
                },
                moveClass: () => {
                    return true
                },
            }
        })
    });

    it('is a Vue instance', () => {
        const wrapper = mount(Semester, {stubs: {'class': true}, propsData: {'selectedSubjects': [1], 'semesterSubjects': [1], 'index': 1, 'roadID': 1, 'isOpen' : true,}, store, localVue});
        expect(wrapper.isVueInstance()).toBeTruthy();
    }),
    it('calculates base year correctly', () => {
        const wrapper = mount(Semester, {stubs: {'class': true}, propsData: {'selectedSubjects': [1], 'semesterSubjects': [1], 'index': 1, 'roadID': 1, 'isOpen' : true,}, store, localVue});
        //for (let i=0; i<12; i++) {

        //}
        jest 
            .spyOn(global.Date, 'now')
            .mockImplementationOnce(() =>
                new Date('2014-10-14T11:01:58.135Z').valueOf()
            ); //only works once, then Date.now() goes back to meaning now
        expect(wrapper.vm.baseYear).toEqual(2019); 
    }) 
    
})