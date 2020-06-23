
const { mutagen } = require('KegMocks')
const { commands } = mutagen
jest.setMock('../../process/runCommand', { executeCmd: commands.listResponse })

const { Sync } = require('../sync')
const sync = new Sync({})

const idOne = `sync_ChWoyx1p7svg5k3k1dIn4IDeuDZMBXDIfaqZuVZuAdi`
const idTwo = `sync_2XhtW6uXucBNGAhRysF6iJDHqFOTKH9nRej02T5FSrf`

describe('Mutagen Sync', () => {

  afterEach(() => {
    commands.listResponse.mockClear()
  })

  afterAll(() => jest.resetAllMocks())

  describe('List', () => {

    it('It returns a list of all active syncs in text format', async () => {

      const data = await sync.list()

      expect(data.indexOf(idOne)).not.toBe(-1)
      expect(data.indexOf(idTwo)).not.toBe(-1)
      expect(commands.listResponse).toHaveBeenCalled()

    })

    it('It returns a list of all active syncs in json format when set', async () => {

      const data = await sync.list({ format: 'json' })

      expect(data.length).toBe(2)
      
      const itemOne = data[0]
      const itemTwo = data[1]

      expect(itemOne.identifier).toBe(idOne)
      expect(itemTwo.identifier).toBe(idTwo)
      expect(commands.listResponse).toHaveBeenCalled()

    })

  })

  describe('Get', () => {

    it('It returns a sync item based on the passed in name', async () => {

      const data = await sync.get({ name: 'core' })

      expect(data.name).toBe('core')
      expect(data.identifier).toBe(idOne)
      expect(commands.listResponse).toHaveBeenCalled()

    })

  })

  describe('Create', () => {

    it('', async () => {
      

    })

  })


})