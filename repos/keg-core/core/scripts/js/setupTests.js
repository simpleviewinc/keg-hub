import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Mocks } from 'KegMocks'

global.testMocks = global.testMocks || {}
Mocks.defaultMocks()

configure({ adapter: new Adapter() })
