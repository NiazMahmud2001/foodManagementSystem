import { Camera , CameraView, useCameraPermissions } from 'expo-camera/next';
import { useState , useEffect, useRef} from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Dimensions} from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as FileSystem from 'expo-file-system';
import axios from "axios";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CamScan = ({navigation , route}) => {
    const {email} = route.params
    const {phone} = route.params
    const {ip} = route.params
    const {port} = route.params
    console.log("Cam scanner port and ip: ", port , ip)
    
    //params for bar code scan ; =======================================================
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [facing , setFacing] = useState("back");
    const [barcodeData , setBarcodeData] = useState();
    const [isScanningBarcode , setIsScanningBarcode] = useState(true) ; //in primary we scan barcode
    //params for expiry code scan: =====================================================
    var cameraRef = useRef()
    const [filteredDate , setFilteredDate] = useState("00/00/0000");
    const [isScanningExpDate , setIsScanningExpDate] = useState(false) ; //in 2nd part we scan barcode

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };
        getCameraPermissions();
    }, []);

    const check_img_size = async (img)=>{
        const { size } = await FileSystem.getInfoAsync(img.uri);
        const sizeInMB = size / (1024 * 1024); // Convert size to MB;
        console.log('Image size: ', sizeInMB, 'MB');
    };

    const getExpDate = (inputString)=>{
        const dateFormats = [
            /\b(\d{1,2})[-/](\d{1,2})[-/](\d{2}|\d{4})\b/g,  // dd/mm/yy or dd/mm/yyyy or dd-mm-yy or dd-mm-yyyy
            /\b(\d{2})(\d{2})(\d{2}|\d{4})\b/g,               // ddmmyy or ddmmyyyy
            /\b(\d{1,2})\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s*(\d{2}|\d{4})\b/gi,  // dd Month yy or dd Month yyyy
            /\b(\d{1,2})\s+(\d{1,2})\s+(\d{2}|\d{4})\b/g,     // dd mm yy or dd mm yyyy
        ];
    
        let expiryDate = null;
    
        // Iterate over date formats and try to find the expiry date
        for (const dateFormat of dateFormats) {
            const matches = inputString.matchAll(dateFormat);
            for (const match of matches) {
                let day, month, year;
                if (match.length === 4) {
                    day = match[1];
                    month = match[2];
                    year = match[3];
                } else if (match.length === 5) {
                    day = match[1];
                    month = match[3];
                    year = match[4];
                }
    
                // Normalize two-digit year to four-digit year
                if (year.length === 2) {
                    const currentYear = new Date().getFullYear();
                    const centuryPrefix = currentYear.toString().slice(0, 2);
                    year = centuryPrefix + year;
                }
    
                // Check if expiry date is after manufacturing date
                const expiry = new Date(`${year}-${month}-${day}`);
                if (!expiryDate || expiry > expiryDate) {
                    expiryDate = expiry;
                }
            }
        }
    
        // Return the extracted expiry date in the specified format
        if (expiryDate) {
            const day = String(expiryDate.getDate()).padStart(2, '0');
            const month = String(expiryDate.getMonth() + 1).padStart(2, '0');
            const year = expiryDate.getFullYear();
            setFilteredDate(`${day}/${month}/${year}`);
        } 
    }

    var analyzeImg = async (baseImage)=>{
        const apiKey = "AIzaSyDW9fs9QNl5yc7wvjXWHLiLkvM4KEWHrVw";
        const api_url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

        //const imageUri = "../../../assets/notecards2.jpg";
        //console.log(baseImage.uri)

        const imageUri = baseImage;
        const imageBuffer = await FileSystem.readAsStringAsync(imageUri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        console.log(typeof(imageBuffer))

        const body  = {
            requests: [
                {
                    image: {
                        content: imageBuffer,
                    },
                    features: [
                        {
                            type: 'TEXT_DETECTION',
                            maxResults: 1,
                        },
                    ],
                }
            ]
        };
        const response = await fetch(api_url, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const result = await response.json();
        const detectedText = result.responses[0]?.textAnnotations?.[0]?.description || 'No text detected';
        //console.log('callGoogleVisionAsync -> result', detectedText);
        getExpDate(detectedText);
        console.log("=================barcodeData=============================================")
    }

    var scannerOfExp = async ()=>{
        let opts = {
            quality: 1, 
            base64: true ,
            exif: false,
            imageType:"jpg",
        };
        const photo = await cameraRef.current.takePictureAsync(opts);
        
        analyzeImg(photo.uri)
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setIsScanningBarcode(false);
        setBarcodeData(data)
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    };
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    };

    const moveEnterFoodWithBarCodePage = ()=>{
        console.log("Barcode data: " , barcodeData);
        //console.log("exp date: " , filteredDate);
        navigation.navigate("EnterFoodWithBarCode", {
            barcodess: barcodeData,
            expDate: filteredDate , 
            email: email, 
            phone: phone , 
            ip: ip, 
            port: port
        });
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.outerView}>
            <View style={styles.topView}>
                <Text style={styles.topStyleText}>
                    {isScanningBarcode? "Please Scan products Barcode":"Please Scan products Exp date"}
                </Text>
            </View>
            <View style={styles.container}>
                {isScanningBarcode? <View style= {styles.barcodeScanCam}>
                        <CameraView
                            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                            barcodeScannerSettings={{
                                barCodeTypes:[BarCodeScanner.Constants.BarCodeType.qr]
                            }}
                            facing = {facing}
                            style={StyleSheet.absoluteFillObject}
                        />
                    </View> : <View style= {styles.expDateScanCam}>
                        <CameraView
                            CameraMode ='picture'
                            ref = {cameraRef}
                            style={StyleSheet.absoluteFillObject}
                            zoom={0.5}
                        />
                    </View>
                }
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.flipCam} onPress={toggleCameraFacing}>
                    <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
                {scanned && 
                    (
                        <TouchableOpacity style={styles.button} onPress={() => setScanned(false) }>
                            <Text>TAP TO SCAN AGAIN</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <View style={styles.buttonContainer2}>
                {scanned && 
                    (   <View style={styles.bottomButtonCont}>
                            <TouchableOpacity style={styles.button} onPress={() => scannerOfExp()}>
                                <Text>Scan Exp Date</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => moveEnterFoodWithBarCodePage()}>
                                <Text>Next {" >>"} </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    outerView:{
        display: "flex", 
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        width: windowWidth,
        height: windowHeight
    },
    topStyleText:{
        fontSize: 17,
        marginBottom: 20,
        borderBottomWidth: 2,
    },
    buttonContainer:{
        display: "flex", 
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        marginTop: 35,
    },
    buttonContainer2:{
        display: "flex", 
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
    },
    container:{
        display: "flex", 
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        width: windowWidth,
        height: windowHeight/2
    },
    barcodeScanCam:{
        width: windowWidth,
        height: windowHeight/2
    },
    expDateScanCam:{
        width: windowWidth,
        height: windowHeight/5.5
    },
    flipCam:{
        display: "flex", 
        justifyContent:"center",
        alignItems:"center",
        width: 155,
        height: 50,
        borderWidth: 0.5, 
        borderColor: "#000",
        marginBottom: 30,
        marginRight: 40,
        borderRadius: 10
    },
    button:{
        display: "flex", 
        justifyContent:"center",
        alignItems:"center",
        width: 170,
        height: 50,
        borderWidth: 0.5, 
        borderColor: "#000",
        marginBottom: 30,
        borderRadius: 10
    }, 
    bottomButtonCont:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: windowWidth-10,
    }
})

export default CamScan