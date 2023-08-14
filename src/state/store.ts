import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {DEFAULT_INITIAL_SETTINGS} from '../constants/initialSettings'
import { type Store, type Actions } from "../types";



export const useEditorStore = create<Store & Actions>()(
    devtools(persist(
        (set) => ({
            ...DEFAULT_INITIAL_SETTINGS,
            updateContent: (lang , text) => {
                set((state) => ({...state, [lang]: text}))
            },
            updateLayout: (newLayout) => set((state) => ({...state, layout: newLayout})),
            updateTheme: (newTheme) => set((state) => ({...state, theme: newTheme})),
            updateSettings: (key, value) => set((state) => ({
                ...state,
                editorSettings: {
                    ...state.editorSettings,
                    [key]: value
                }
            })),
            updateLastCDNImport: (link) => set((state) => ({
                ...state,
                lastCDNImport: link
            }))
        }),
        {
            name: 'prototype-editor'
        }
    ))
)