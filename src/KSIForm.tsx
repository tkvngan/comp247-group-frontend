import React, {ReactElement, useState} from "react";

import {
    Button, Card,
    Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControl,
    Grid,
    Input,
    MenuItem, Paper,
    Select,
    SelectChangeEvent,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme
} from "@mui/material";
import {FieldDefinition, fieldDefinitions, FieldName, fieldNames, models} from "./KSI";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import axios, {AxiosRequestConfig} from "axios";

function KSIForm(): ReactElement {
    const theme = useTheme();
    const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
    const [modelName, setModelName] = useState<string>(Object.keys(models)[0]);
    // const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [response, setResponse] = useState<any>(undefined);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (modelName === "") {
            alert("Please select a model");
            return
        }
        const submitData = {...fieldValues};
        for (const fieldName of fieldNames) {
            if (fieldDefinitions[fieldName].type === "boolean" && !submitData[fieldName]) {
                submitData[fieldName] = "No";
            }
        }
        const request = {
            model: modelName,
            data: submitData
        }
        console.log("Submit Request:", JSON.stringify(request, null, 2));
        const requestConfig: AxiosRequestConfig = {
            method: "POST",
            responseType: "json",
            responseEncoding: "utf8",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            data: request,
            validateStatus: (status) => true
        }
        axios.post("/prediction", request, requestConfig).then(resp => {
            console.log("Prediction response", resp.data);
            if (resp.status === 200) {
                setResponse(resp.data);
            } else {
                setResponse({
                    error: `${resp.status}: ${resp.statusText}`
                })
            }
        }).catch(error => {
            console.error("Prediction error", error);
            setResponse({
                error: `Error: ${error}`
            })
        });
    };

    const handleReset = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Resetting form")
        setFieldValues({});
    }

    const handleRandomize = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Randomizing form")
        setFieldValues(randomize());
    }

    const handleCloseDialog = () => {
        // setIsDialogOpen(false);
        setResponse(undefined);
    }

    function renderDialog(): ReactElement {
        return (
            <Dialog
                open={response}
                onClose={handleCloseDialog}
                PaperProps={{
                    component: 'form',
                    sx: {
                        p: 2,
                        backgroundColor: theme.palette.background.default,
                    },
                }}>
                <DialogTitle>{response?.error ? "ERROR" : "RESULT"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {response?.error && (
                            <Typography variant="h6" component="div" color="error">{response?.error}</Typography>
                        )}
                        {response?.model && (
                            <div>
                                <Typography variant="h6" component="div" color="success">
                                    Model: {models[response.model]}
                                </Typography>
                                <Typography variant="h6" component="div" color="success">
                                    Accident Class: {response.result}
                                </Typography>
                            </div>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Ok</Button>
                </DialogActions>
            </Dialog>
        )

    }

    function randomize(): Record<string, string> {
        const randomValues: Record<string, string> = {};
        for (const fieldName of fieldNames) {
            const fieldDefinition = fieldDefinitions[fieldName];
            if (fieldDefinition.type === "boolean") {
                randomValues[fieldName] = Math.random() > 0.5 ? "Yes" : "No";
            } else if (fieldDefinition.type === "number") {
                randomValues[fieldName] = Math.floor(Math.random() * 100).toString();
            } else if (fieldDefinition.values) {
                if (Array.isArray(fieldDefinition.values)) {
                    const options: string[] = fieldDefinition.values as string[];
                    randomValues[fieldName] = options[Math.floor(Math.random() * options.length)];
                } else {
                    const options: Record<string, string> = fieldDefinition.values as Record<string, string>;
                    const keys = Object.keys(options);
                    randomValues[fieldName] = keys[Math.floor(Math.random() * keys.length)];
                }
            } else {
                randomValues[fieldName] = "Random";
            }
        }
        return randomValues;
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValues({
            ...fieldValues,
            [event.target.name]: event.target.value,
        });
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValues({
            ...fieldValues,
            [event.target.name]: event.target.checked ? "Yes" : "No",
        });
    }

    const handleSelectChange = (event: SelectChangeEvent) => {
        console.log("Select change", event.target.name, event.target.value)
        if (event.target.name) {
            const newFieldValues = {
                ...fieldValues,
                [event.target.name]: event.target.value,
            }
            console.log(JSON.stringify(newFieldValues, null, 2))
            setFieldValues(newFieldValues);
        }
    };

    const handleModelChange = (event: SelectChangeEvent) => {
        setModelName(event.target.value);
    }


    function renderField(fieldName: FieldName, definition: FieldDefinition) {
        let field: ReactElement;
        if (definition.type === "string") {
            let menuItems: ReactElement[] = []
            if (definition.values && Array.isArray(definition.values)) {
                const options: string[] = definition.values as string[];
                menuItems = options.map(option =>
                    <MenuItem value={option}>
                        {option}
                    </MenuItem>)
            } else if (definition.values && typeof definition.values === "object") {
                const options: Record<string, string> = definition.values as Record<string, string>;
                menuItems = Object.keys(options).map(option =>
                    <MenuItem value={option}>
                        {option + " - " + options[option]}
                    </MenuItem>)
            }
            field = (
                <FormControl fullWidth={true}>
                    <Select
                        id={fieldName + "-field"}
                        name={fieldName}
                        variant="standard"
                        size={"small"}
                        value={fieldValues[fieldName] ?? ""}
                        onChange={handleSelectChange}>
                        {menuItems}
                    </Select>
                </FormControl>
            )
        } else if (definition.type === "boolean") {
            field = (
                <FormControl>
                    <Checkbox
                        id={fieldName + "-field"}
                        name={fieldName}
                        size={"small"}
                        checked={fieldValues[fieldName] === "Yes"}
                        onChange={handleCheckboxChange}
                    />
                </FormControl>
            )
        } else {
            field = (
                <FormControl>
                    <Input
                        id={fieldName + "-field"}
                        name={fieldName}
                        size={"small"}
                        value={fieldValues[fieldName] ?? ""}
                        onChange={handleInputChange}
                    />
                </FormControl>
            )
        }
        return (
            <TableRow key={fieldName}>
                <TableCell align="left" sx={{borderBottom: 0, fontWeight: "bold"}} width={"30%"}>{definition.description}:</TableCell>
                <TableCell align="left" sx={{borderBottom: 0}}>{field}</TableCell>
            </TableRow>
        )
    }

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

    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll>
                <AppBar sx={{backgroundColor: 'white'}} color="default" >
                    <Grid container alignItems="center">
                        <Grid item xs={12}>
                            <Box sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                                padding: "1rem",
                            }}>
                                <Typography variant="h3" component="div" color="white">
                                    KSI Accident Prediction
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} container sx={{marginTop: "1rem", marginX: "2rem"}}>
                            <Grid item xs={7}>
                                <Typography variant="body1" component="div">
                                    Prediction of KSI (Killed or Seriously Injured) Accident Classification
                                </Typography>
                            </Grid>
                            <Grid item xs={5}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Typography variant="body1" component="div">
                                        Model:
                                    </Typography>
                                    <Select
                                        id={"model-field"}
                                        variant="standard"
                                        size={"small"}
                                        fullWidth={true}
                                        value={modelName}
                                        onChange={handleModelChange}>
                                        { Object.keys(models).map(modelName => <MenuItem value={modelName}>{models[modelName]}</MenuItem>) }
                                    </Select>
                                    <Button variant="outlined" color="primary" onClick={handleSubmit}>Submit</Button>
                                    <Button variant="outlined" color="primary" onClick={handleReset}>Reset</Button>
                                    <Button variant="outlined" color="primary" sx={{width: "15rem"}} onClick={handleRandomize}>Randomize</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                    <TableContainer sx={{paddingX: "1rem"}}>
                        <Table size={"small"}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontWeight:"bold"}} width={"30%"} >Factors</TableCell>
                                    <TableCell sx={{fontWeight:"bold"}}>Value</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </AppBar>
            </ElevationScroll>
            <div style={{height: "190px"}}/>
            <TableContainer sx={{paddingX:'1rem'}}>
                <Table size={"small"}>
                    <TableBody>
                        {fieldNames.map(fieldName => renderField(fieldName, fieldDefinitions[fieldName]))}
                    </TableBody>
                </Table>
            </TableContainer>
            {response && renderDialog()}
        </React.Fragment>
    )
}

export default KSIForm;

