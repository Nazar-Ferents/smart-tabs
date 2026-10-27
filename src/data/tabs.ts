import type {ITab} from "../modules/ITabs.ts";
import dashboardIcon from "../assets/tabs-icon/dashboard.png";
import bankingIcon from "../assets/tabs-icon/banking.png";
import telefonieIcon from "../assets/tabs-icon/telefonie.png";
import accountingIcon from "../assets/tabs-icon/accounting.png";
import verkaufIcon from "../assets/tabs-icon/verkaufIcon.png";
import statistikIcon from "../assets/tabs-icon/statistik.png";
import officeIcon from "../assets/tabs-icon/office2.png";
import administrationIcon from "../assets/tabs-icon/administration.png";
import helpIcon from "../assets/tabs-icon/help.png";
import warenbestandIcon from "../assets/tabs-icon/warenbestand.png";
import auswahllistenIcon from "../assets/tabs-icon/auswahllisten.png";
import einkaufIcon from "../assets/tabs-icon/einkauf.png";
import rechnIcon from "../assets/tabs-icon/rechn.png";
import lagerverwaltungIcon from "../assets/tabs-icon/lagerverwaltung.png";


export const initialTabs:ITab[] = [
    {
        id:'dashboard',
        title:'Dashboard',
        url:'/dashboard',
        pinned:false,
        icon:dashboardIcon
    },
    {
        id:'banking',
        title:'Banking',
        url:'/banking',
        pinned:false,
        icon:bankingIcon
    },{
        id:'telefonie',
        title:'Telefonie',
        url:'/telefonie',
        pinned:false,
        icon:telefonieIcon

    },{
        id:'accounting',
        title:'Accounting',
        url:'/accounting',
        pinned:false,
        icon:accountingIcon
    },{
        id:'verkauf',
        title:'Verkauf',
        url:'/verkauf',
        pinned:false,
        icon: verkaufIcon,
    },{
        id:'statistik',
        title:'Statistik',
        url:'/statistik',
        pinned:false,
        icon:statistikIcon
    },{
        id:'post-office',
        title:'Post Office',
        url:'/post-office',
        pinned:false,
        icon:officeIcon
    },{
        id:'administration',
        title:'Administration',
        url:'/administration',
        pinned:false,
        icon:administrationIcon
    },{
        id:'help',
        title:'Help',
        url:'/help',
        pinned:false,
        icon:helpIcon


    },{
        id:'warenbestand',
        title:'Warenbestand',
        url:'/warenbestand',
        pinned:false,
        icon:warenbestandIcon

    },{
        id:'auswahllisten',
        title:'Auswahllisten',
        url:'/auswahllisten',
        pinned:false,
        icon:auswahllistenIcon

    },{
        id:'einkauf',
        title:'Einkauf',
        url:'/einkauf',
        pinned:false,
        icon:einkaufIcon

    },{
        id:'rechn',
        title:'Rechn',
        url:'/rechn',
        pinned:false,
        icon: rechnIcon,

    },{
        id:'lagerverwaltung',
        title:'Lagerverwaltung',
        url:'/lagerverwaltung',
        pinned:false,
        icon:lagerverwaltungIcon

    }
]