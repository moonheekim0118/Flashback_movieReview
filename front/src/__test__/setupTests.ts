import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
// enzyme mount 함수가 react-17에서 적용되지 않으므로 일단 개인 라이브러리 사용

configure({ adapter: new Adapter() });
