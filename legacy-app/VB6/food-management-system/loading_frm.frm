VERSION 5.00
Begin VB.Form loading_frm 
   BackColor       =   &H00FFFF80&
   BorderStyle     =   0  'None
   Caption         =   "Form3"
   ClientHeight    =   4785
   ClientLeft      =   0
   ClientTop       =   0
   ClientWidth     =   9105
   LinkTopic       =   "Form3"
   MaxButton       =   0   'False
   MinButton       =   0   'False
   ScaleHeight     =   4785
   ScaleWidth      =   9105
   ShowInTaskbar   =   0   'False
   StartUpPosition =   2  'CenterScreen
   Begin VB.Timer timeout_tmr 
      Interval        =   9000
      Left            =   1200
      Top             =   600
   End
   Begin VB.Timer Timer1 
      Interval        =   300
      Left            =   120
      Top             =   360
   End
   Begin VB.Label Label1 
      BackColor       =   &H00FFFF00&
      Caption         =   "Food Management System created by ADESUYI ADEBOLA, AKINYEMI TOSIN, ONIBOKUN AYOMIDE. Submitted to the HOD of Computer Engineering"
      BeginProperty Font 
         Name            =   "Bell MT"
         Size            =   9
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H00FFFFFF&
      Height          =   615
      Left            =   0
      TabIndex        =   0
      Top             =   4320
      Width           =   8895
   End
   Begin VB.Shape Shape2 
      BackStyle       =   1  'Opaque
      BorderColor     =   &H00FFFFFF&
      Height          =   3735
      Left            =   8640
      Top             =   1080
      Width           =   3135
   End
   Begin VB.Shape Shape1 
      BackStyle       =   1  'Opaque
      BorderColor     =   &H00FFFFFF&
      Height          =   3735
      Left            =   0
      Top             =   1080
      Width           =   615
   End
   Begin VB.Image Imagelogo 
      Height          =   1695
      Left            =   3600
      Picture         =   "loading_frm.frx":0000
      Stretch         =   -1  'True
      Top             =   240
      Width           =   2295
   End
   Begin VB.Image Image2 
      Height          =   1395
      Left            =   0
      Picture         =   "loading_frm.frx":1DA0
      Top             =   1560
      Width           =   6855
   End
   Begin VB.Image Image3 
      Height          =   900
      Left            =   4800
      Picture         =   "loading_frm.frx":255A
      Top             =   1920
      Width           =   3990
   End
   Begin VB.Image Image4 
      Height          =   900
      Left            =   3360
      Picture         =   "loading_frm.frx":375D
      Top             =   2640
      Width           =   2370
   End
   Begin VB.Image Image1 
      Height          =   5490
      Left            =   600
      Picture         =   "loading_frm.frx":4307
      Top             =   1080
      Width           =   8250
   End
End
Attribute VB_Name = "loading_frm"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Option Explicit
Dim i As Integer

Private Sub timeout_tmr_Timer()
    Unload Me
    login3_frm.Show
End Sub

Private Sub Timer1_Timer()
    ' Dynamic gif loading disabled to allow removal of external img folder
End Sub

Private Sub Timer2_Timer()

End Sub
