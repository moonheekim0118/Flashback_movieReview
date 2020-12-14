import 'jsdom-global/register';
import { act } from 'react-dom/test-utils';
import { testHook } from '../testUtils';
import useValidation from '../../hooks/useValidation';

// [ value ,handler , validation ]

describe('useInput', () => {
  let inputHandler;
  beforeEach(() => {
    testHook(() => {
      inputHandler = useValidation('test', 2, 5);
    });
  });

  it('should have a handler function', () => {
    // handler 체크
    expect(inputHandler[1]).toBeInstanceOf(Function);
  });

  it('should have a correct validation function', () => {
    // setter 체크
    expect(inputHandler[2]).toBe(false);
  });

  it('should have correct value', () => {
    // value 체크
    expect(inputHandler[0]).toBe('test');
  });

  it('should update the value when handler is called', () => {
    // handler 기능 체크
    // 변경 value가 maximum 보다 큰 경우
    act(() => {
      inputHandler[1]({ target: { value: 'testtest' } });
    });
    expect(inputHandler[0]).toBe('testtest');
    expect(inputHandler[2]).toBe(true); // validation 경고 true
  });

  it('should update the value when handler is called', () => {
    // handler 기능 체크 2
    // 변경 value가 minimum 보다 작은 경우
    act(() => {
      inputHandler[1]({ target: { value: 't' } });
    });
    expect(inputHandler[0]).toBe('t');
    expect(inputHandler[2]).toBe(true); // validation 경고 true
  });
});
