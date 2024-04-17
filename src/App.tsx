import * as React from 'react';
import KSIForm from "./KSIForm";
import {Button, Card, CardActions, CardContent, CardHeader, CardMedia, Paper, Typography} from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {ReactElement} from "react";

function ElevationScroll({children, window}: {children: ReactElement; window?: () => Window;}) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });
    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

function App() {
    return (
        <KSIForm/>
    );
}
export default App;
