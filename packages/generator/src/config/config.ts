import path from 'path'
import { uiOptions } from '@create-vite-plugin-ssr/cli/src/config'
import { generatePackageJson } from '../generatePackageJson'
import { generateTsConfig } from '../generateTsConfig'
import { generateViteConfig } from '../generateViteConfig'
import {
  copyGitIgnore,
  copySharedDirs,
  copyUiDirs,
  createUiDirs,
  generateJsTemplates,
  replaceES6Imports
} from '../generateFilesystem'

const cwd = process.cwd()

export const boilerplateRootDir = path.join(cwd, '..', 'boilerplate', 'templates')
export const sharedRootDir = path.join(cwd, '..', 'boilerplate', 'shared')
export const templateRootDir = path.join(cwd, '..', 'templates')

export const tsTasks = [
  {
    title: 'Created UI directories',
    async task() {
      await createUiDirs()
    }
  },
  {
    title: 'Copied shared directories',
    async task() {
      await copySharedDirs()
    }
  },
  {
    title: 'Copied UI directories',
    async task() {
      await copyUiDirs()
    }
  },
  {
    title: 'Copied .gitignore',
    async task() {
      await copyGitIgnore(true)
    }
  },
  {
    title: 'Generated Package file',
    async task() {
      for (const ui of uiOptions) {
        await generatePackageJson(ui, true)
      }
    }
  },
  {
    title: 'Generated Typescript config',
    async task() {
      for (const ui of uiOptions) {
        await generateTsConfig(ui)
      }
    }
  },
  {
    title: 'Generated Vite config',
    async task() {
      for (const ui of uiOptions) {
        await generateViteConfig(ui)
      }
    }
  }
] as const

export const jsTasks = [
  {
    title: 'Generated JavaScript templates',
    async task() {
      await generateJsTemplates()
    }
  },
  {
    title: 'Copied .gitignore',
    async task() {
      await copyGitIgnore(false)
    }
  },
  {
    title: 'Generated Package file',
    async task() {
      for (const ui of uiOptions) {
        await generatePackageJson(ui, false)
      }
    }
  },
  {
    title: 'Replaced imports',
    async task() {
      for (const ui of uiOptions) {
        await replaceES6Imports(ui, 'server/index.js')
      }
    }
  }
] as const
