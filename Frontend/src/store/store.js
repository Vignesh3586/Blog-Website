import { configureStore } from "@reduxjs/toolkit"
import postsReducer from "../slice/posts/postsSlice"

export const store=configureStore(
    { reducer:{
        posts:postsReducer,
    }

    }
)